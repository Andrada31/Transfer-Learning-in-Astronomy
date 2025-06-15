import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

def telescoper_filter(image_path, brightness_factor=1.2, haze_strength=0.4, contrast_factor=0.7):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Image not found / unsupported format.")
    
    img = img.astype(np.float32) / 255.0
    adjusted = np.clip(img * brightness_factor, 0, 1)
    adjusted = np.clip((adjusted - 0.5) * contrast_factor + 0.5, 0, 1)
    adjusted = (adjusted * 255).astype(np.uint8)

    haze = np.full_like(adjusted, 255, dtype=np.uint8)
    hazy_image = cv2.addWeighted(adjusted, 1 - haze_strength, haze, haze_strength, 0)

    gray_image = cv2.cvtColor(hazy_image, cv2.COLOR_BGR2GRAY)
    return gray_image


def main():
    image_path = input("Enter the path: ").strip()
    if not os.path.exists(image_path):
        print("Image file not found.")
        return
    try:
        output_image = telescoper_filter(image_path)
        output_path = os.path.splitext(image_path)[0] + '_hazy_output.jpg'
        cv2.imwrite(output_path, output_image)
        print(f"Saved as: {output_path}")

        plt.imshow(cv2.cvtColor(output_image, cv2.COLOR_BGR2RGB))
        plt.axis('off')
        plt.title("Telescope Filtered Image")
        plt.show()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
