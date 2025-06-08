mai, pa-run ito sa terminal:

python -m venv virt

.\virt\Scripts\activate

cd backend

pip install -r requirements.txt

cd ..

uvicorn backend.main:app --reload

tapos sa browser, punta kasa localhost:8000

then http://localhost:8000/docs

from there, you can explore all the endpoints

lmk if may questions

