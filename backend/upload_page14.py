import firebase_admin
from firebase_admin import credentials, storage, firestore
from pdf2image import convert_from_path
import os
import uuid

# 🔐 Initialiser Firebase Admin SDK (serviceAccountKey.json à télécharger depuis Firebase Console)
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': '<your-bucket-name>.appspot.com'
})
db = firestore.client()
bucket = storage.bucket()

def extract_and_upload(pdf_path, title, author=""):
    pages = convert_from_path(pdf_path, dpi=150)
    if len(pages) < 14:
        print(f"{pdf_path} n'a pas 14 pages")
        return

    page14 = pages[13]
    temp_path = f"/tmp/{uuid.uuid4()}.png"
    page14.save(temp_path, 'PNG')

    # 🔼 Upload vers Firebase Storage
    blob = bucket.blob(f"page14/{os.path.basename(temp_path)}")
    blob.upload_from_filename(temp_path)
    blob.make_public()

    # 🗃️ Sauvegarde Firestore
    db.collection('pages').add({
        'title': title,
        'author': author,
        'imageUrl': blob.public_url
    })

    print(f"✅ {title} uploadé avec succès !")

# 🔁 Exemple d'utilisation
extract_and_upload("pdfs/Lodyssee.pdf", title="L'Odyssée", author="Homère")

