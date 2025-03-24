FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

RUN pip install "fastapi[standard]"
# Copy the rest of the application
COPY . .


# Expose the port FastAPI will run on
EXPOSE 8000

# Run the app using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]