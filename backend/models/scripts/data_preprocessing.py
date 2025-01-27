import os
from PIL import Image

def resize_images_in_folder(folder_path, max_size=500):
    """
    Resizes all images in a folder and its subfolders to have the longest edge of max_size.
    Args:
    folder_path (str): Path to the folder containing the images.
    max_size (int): Maximum size of the longest edge for the resized images.
    """
    for root, _, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with Image.open(file_path) as img:
                    if max(img.size) > max_size:
                        ratio = max_size / max(img.size)
                        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
                        img = img.resize(new_size, Image.Resampling.LANCZOS)
                        img.save(file_path)
                        print(f"Resized: {file_path} -> {new_size}")
            except Exception as e:
                print(f"Error processing {file_path}: {e}")





