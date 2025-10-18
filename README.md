1. Edwin Yair Molina Cerón - 408873

2. La aplicación fue desarrollada utilizando Node.js con Express, siguiendo una arquitectura limpia y en capas.
El proyecto se organiza en los directorios controller/, service/, repository/, model/ y dto/, asegurando una separación clara de responsabilidades.
Los controladores se encargan únicamente de recibir las solicitudes HTTP, convertir los datos en DTOs y devolver las respuestas. 
La capa de servicio contiene toda la lógica de negocio, validaciones y reglas de estado, mientras que el repositorio se encarga del acceso y manejo de
los datos mediante una implementación en memoria, siguiendo una interfaz definida. Los DTOs separan la entrada y salida del modelo de dominio, 
permitiendo validaciones como verificar que la fecha de vencimiento (dueDate) sea futura. También se usa una enumeración para manejar los estados válidos de las tareas.
Esta estructura mejora la mantenibilidad, facilita las pruebas unitarias y permite cambiar la capa de persistencia sin modificar la lógica principal.
Se eligió Node/Express por su facilidad de uso, rapidez para crear prototipos locales y porque permite escribir un código simple, legible y organizado.

3. https://youtu.be/XM6DMRkcR1M
