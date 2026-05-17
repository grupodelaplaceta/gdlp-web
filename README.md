# Grupo de La Placeta Web

Web institucional estática para la Asociación Grupo de La Placeta.

## Qué incluye

- Landing institucional del ecosistema virtual.
- Directorio de organizaciones públicas, empresas y asociaciones.
- Wizard de alta con validación de edad, consentimiento de rol/RGPD, captcha simple, alta real en PlacetaID y QR de autenticador 2FA.
- Portal de miembro demo.
- Panel admin local para publicar noticias en `localStorage`.
- Estética alineada con Banco de La Placeta: Outfit y acento `#3F00D8`.

## Deploy en Vercel

Este folder no necesita build. Publica `gdlp-web` como proyecto estático.

## Pendiente para producción real

- Conectar el alta con la creación simultánea de cuenta bancaria base en Banco de La Placeta.
- Añadir captcha real y rate limiting específico del servidor GDLP.
- Reemplazar admin local por autenticación de Junta.
- Servir PDFs definitivos de estatutos y normativa.
