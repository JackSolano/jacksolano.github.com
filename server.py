import os
from flask import Flask, request, jsonify, send_from_directory
import json

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/subpagina/<path:path>')
def serve_subpage_static(path):
    return send_from_directory('subpagina', path)

@app.route('/update_gastos', methods=['POST'])
def update_gastos():
    try:
        # Verifica si el archivo existe
        file_path = os.path.join('subpagina', 'gastos.json')
        if not os.path.exists(file_path):
            with open(file_path, 'w') as file:
                json.dump([], file)

        data = request.json
        if not data or 'gasto' not in data or 'cantidad' not in data:
            return jsonify({'error': 'Datos inválidos'}), 400

        # Leer el archivo JSON existente
        with open(file_path, 'r') as file:
            gastos = json.load(file)

        # Añadir el nuevo gasto
        gastos.append(data)

        # Escribir los cambios en el archivo JSON
        with open(file_path, 'w') as file:
            json.dump(gastos, file, indent=4)

        return "Gastos actualizados.", 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
