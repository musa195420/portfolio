import json
import mimetypes
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client


ROOT_DIR = Path(__file__).resolve().parent

ASSET_SITE_DIR = ROOT_DIR / "asset-site"
ASSETS_DIR = ASSET_SITE_DIR / "portfolio"

ENV_FILE = ROOT_DIR / ".env.local"
OUTPUT_FILE = ROOT_DIR / "portfolio-assets-urls.json"

BUCKET_NAME = "portfolio-assets"


load_dotenv(ENV_FILE)

SUPABASE_URL = os.getenv("NEXT_SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")


if not SUPABASE_URL:
    raise RuntimeError(
        f"NEXT_SUPABASE_URL is missing from {ENV_FILE}"
    )

if not SUPABASE_SECRET_KEY:
    raise RuntimeError(
        f"SUPABASE_SECRET_KEY is missing from {ENV_FILE}"
    )

if not ASSETS_DIR.exists():
    raise RuntimeError(
        f"Portfolio assets directory does not exist:\n{ASSETS_DIR}"
    )


supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY,
)


def ensure_bucket():
    print(f"\nChecking bucket: {BUCKET_NAME}")

    try:
        supabase.storage.get_bucket(BUCKET_NAME)
        print(f"Bucket already exists: {BUCKET_NAME}")

    except Exception:
        print(f"Creating bucket: {BUCKET_NAME}")

        supabase.storage.create_bucket(
            BUCKET_NAME,
            options={
                "public": True,
            },
        )

        print(f"Created public bucket: {BUCKET_NAME}")


def get_content_type(file_path: Path):
    content_type, _ = mimetypes.guess_type(str(file_path))

    if content_type:
        return content_type

    return "application/octet-stream"


def build_public_url(storage_path: str):
    result = (
        supabase.storage
        .from_(BUCKET_NAME)
        .get_public_url(storage_path)
    )

    if isinstance(result, str):
        return result

    if isinstance(result, dict):
        return (
            result.get("publicUrl")
            or result.get("publicURL")
            or result.get("public_url")
        )

    return str(result)


def upload_file(file_path: Path):
    relative_path = file_path.relative_to(ASSETS_DIR)

    storage_path = relative_path.as_posix()

    content_type = get_content_type(file_path)

    print(f"Uploading: {storage_path}")

    with open(file_path, "rb") as file:
        supabase.storage.from_(BUCKET_NAME).upload(
            path=storage_path,
            file=file,
            file_options={
                "content-type": content_type,
                "cache-control": "3600",
                "upsert": "true",
            },
        )

    public_url = build_public_url(storage_path)

    return {
        "bucket": BUCKET_NAME,
        "path": storage_path,
        "url": public_url,
        "content_type": content_type,
        "filename": file_path.name,
    }


def set_nested_value(data, path_parts, value):
    current = data

    for part in path_parts[:-1]:
        current = current.setdefault(part, {})

    current[path_parts[-1]] = value


def collect_files():
    allowed_extensions = {
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif",
        ".svg",
        ".pdf",
    }

    files = []

    for path in ASSETS_DIR.rglob("*"):
        if not path.is_file():
            continue

        if path.suffix.lower() not in allowed_extensions:
            print(f"Skipping unsupported file: {path}")
            continue

        files.append(path)

    return sorted(files)


def main():
    print("\n======================================")
    print("SUPABASE PORTFOLIO ASSET UPLOADER")
    print("======================================")
    print(f"Script directory: {ROOT_DIR}")
    print(f"Assets directory: {ASSETS_DIR}")
    print(f"Environment file: {ENV_FILE}")
    print(f"Bucket: {BUCKET_NAME}")
    print("======================================")

    ensure_bucket()

    files = collect_files()

    print(f"\nFound {len(files)} files.\n")

    manifest = {
        "bucket": BUCKET_NAME,
        "base_url": (
            f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}"
        ),
        "total_files": len(files),
        "assets": {},
        "files": [],
    }

    success_count = 0
    failed_count = 0

    for index, file_path in enumerate(files, start=1):
        relative_path = file_path.relative_to(ASSETS_DIR)

        print(
            f"[{index}/{len(files)}] "
            f"{relative_path.as_posix()}"
        )

        try:
            uploaded = upload_file(file_path)

            manifest["files"].append(uploaded)

            set_nested_value(
                manifest["assets"],
                list(relative_path.parts),
                uploaded["url"],
            )

            success_count += 1

            print(f"URL: {uploaded['url']}\n")

        except Exception as error:
            failed_count += 1

            print(f"FAILED: {relative_path}")
            print(f"{error}\n")

            manifest["files"].append(
                {
                    "path": relative_path.as_posix(),
                    "error": str(error),
                }
            )

    manifest["uploaded"] = success_count
    manifest["failed"] = failed_count

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8",
    ) as file:
        json.dump(
            manifest,
            file,
            indent=2,
            ensure_ascii=False,
        )

    print("\n======================================")
    print("UPLOAD COMPLETE")
    print("======================================")
    print(f"Total files: {len(files)}")
    print(f"Uploaded:    {success_count}")
    print(f"Failed:      {failed_count}")
    print(f"Bucket:      {BUCKET_NAME}")
    print(f"JSON file:   {OUTPUT_FILE}")
    print("======================================\n")


if __name__ == "__main__":
    main()