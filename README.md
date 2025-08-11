# Historias

Un conjunto de relatos ambientados en Biblián y su gente.

## Desarrollo

El proyecto es un sitio estático construido con archivos Markdown y una página principal `index.html`.
Para agregar o modificar historias:

1. Crea o edita un archivo `*.md` con el texto de la historia.
2. Actualiza `index.html` para enlazar la historia e incorporar imágenes si es necesario.

No se requiere ninguna dependencia ni herramienta especial para editar los archivos.

## Visualización

Para observar el proyecto de forma local basta con clonar el repositorio y abrir `index.html` en un navegador.
Opcionalmente, puedes iniciar un servidor sencillo:

```bash
git clone https://github.com/MarcoS9309/Historias.git
cd Historias
python -m http.server
```

Luego visita `http://localhost:8000` y navega a `index.html`.

## Licencia

Este proyecto se distribuye bajo los términos de la [Licencia MIT](LICENSE).
