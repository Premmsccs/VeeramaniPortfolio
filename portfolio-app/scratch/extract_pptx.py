import zipfile
import os

pptx_path = 'd:/veermani portfolio/Veeramani Presentation Design Portofolio (1).pptx'
output_dir = 'd:/veermani portfolio/portfolio-app/public/assets/profile_candidates/'

os.makedirs(output_dir, exist_ok=True)

with zipfile.ZipFile(pptx_path, 'r') as z:
    media_files = [f for f in z.namelist() if f.startswith('ppt/media/')]
    print(f"Total media files found: {len(media_files)}")
    
    # Sort files to find largest images, which are typically photo assets
    media_with_sizes = []
    for f in media_files:
        info = z.getinfo(f)
        media_with_sizes.append((f, info.file_size))
        
    media_with_sizes.sort(key=lambda x: x[1], reverse=True)
    
    # Print the top 30 largest media files
    for idx, (f, size) in enumerate(media_with_sizes[:30]):
        ext = os.path.splitext(f)[1]
        out_name = f"cand_{idx}{ext}"
        print(f"Extracted {f} ({size} bytes) -> {out_name}")
        with open(os.path.join(output_dir, out_name), 'wb') as out_f:
            out_f.write(z.read(f))
