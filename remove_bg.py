import sys
from rembg import remove
from PIL import Image

def remove_bg(input_path, output_path):
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    remove_bg("/home/celio/.gemini/antigravity/brain/5a5b53cf-aad8-4633-af59-65a516660ce6/media__1787235322918.jpg", "/home/celio/Documentos/landing/modern-3d-site-main/public/taynara-1.png")
    remove_bg("/home/celio/.gemini/antigravity/brain/5a5b53cf-aad8-4633-af59-65a516660ce6/media__1787235322841.jpg", "/home/celio/Documentos/landing/modern-3d-site-main/public/taynara-2.png")
