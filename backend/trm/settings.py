"""
Django settings for The Right Molecule backend.

All secrets and per-environment values come from environment variables, which
are read from backend/.env in development (see .env.example).
"""

import os
from pathlib import Path

import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent


def _load_dotenv(path):
    """Minimal .env loader: KEY=VALUE lines, # comments. Real env vars win."""
    if not path.exists():
        return
    for line in path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_dotenv(BASE_DIR / '.env')


def env(key, default=''):
    return os.environ.get(key, default)


def env_bool(key, default=False):
    return env(key, str(default)).lower() in ('1', 'true', 'yes', 'on')


def env_list(key, default=''):
    return [v.strip() for v in env(key, default).split(',') if v.strip()]


DEBUG = env_bool('DJANGO_DEBUG', False)

SECRET_KEY = env('DJANGO_SECRET_KEY')
if not SECRET_KEY:
    if not DEBUG:
        raise RuntimeError('DJANGO_SECRET_KEY must be set when DJANGO_DEBUG is off.')
    SECRET_KEY = 'dev-only-insecure-key'

ALLOWED_HOSTS = env_list('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'store',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'trm.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'trm.wsgi.application'


# Database
# SQLite in development. In production set DATABASE_URL (Render provides it for its Postgres).

DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
        conn_health_checks=True,
    )
}


AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


LANGUAGE_CODE = 'en-in'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {
        'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage' if DEBUG
        else 'whitenoise.storage.CompressedManifestStaticFilesStorage',
    },
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# CORS: only the storefront may call the API from a browser.

CORS_ALLOWED_ORIGINS = env_list('CORS_ALLOWED_ORIGINS', 'http://localhost:5173')
CORS_URLS_REGEX = r'^/api/.*$'


# Production hardening (behind an HTTPS proxy such as Render/Railway/Nginx).

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SECURE_REDIRECT_EXEMPT = [r'^api/products/$']  # Render's health check calls this over plain HTTP
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    CSRF_TRUSTED_ORIGINS = env_list('CSRF_TRUSTED_ORIGINS')


# Cashfree Payment Gateway

CASHFREE_ENV = env('CASHFREE_ENV', 'sandbox')  # 'sandbox' or 'production'
CASHFREE_CLIENT_ID = env('CASHFREE_CLIENT_ID')
CASHFREE_CLIENT_SECRET = env('CASHFREE_CLIENT_SECRET')
CASHFREE_API_VERSION = env('CASHFREE_API_VERSION', '2026-01-01')

# Where Cashfree sends the customer after paying. {order_id} is filled in by us.
CHECKOUT_RETURN_URL = env('CHECKOUT_RETURN_URL', 'http://localhost:5173/checkout.html?order_id={order_id}')
# Public https URL of this backend, used for the per-order webhook (notify_url).
# Leave empty in local development; configure the webhook in the Cashfree dashboard instead.
BACKEND_PUBLIC_URL = env('BACKEND_PUBLIC_URL')


# Store

SHIPPING_FEE_INR = env('SHIPPING_FEE_INR', '0')
MAX_QTY_PER_ITEM = int(env('MAX_QTY_PER_ITEM', '10'))


# Email
# With EMAIL_HOST unset, emails are printed to the console instead of sent.

if env('EMAIL_HOST'):
    MAILERS = {
        'default': {
            'BACKEND': 'django.core.mail.backends.smtp.EmailBackend',
            'OPTIONS': {
                'host': env('EMAIL_HOST'),
                'port': int(env('EMAIL_PORT', '587')),
                'username': env('EMAIL_HOST_USER'),
                'password': env('EMAIL_HOST_PASSWORD'),
                'use_tls': env('EMAIL_PORT', '587') != '465',
                'use_ssl': env('EMAIL_PORT', '587') == '465',
                'timeout': 15,
            },
        },
    }
else:
    MAILERS = {'default': {'BACKEND': 'django.core.mail.backends.console.EmailBackend'}}

DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', 'The Right Molecule <orders@therightmolecule.com>')
SERVER_EMAIL = DEFAULT_FROM_EMAIL
# Shown in emails as the address customers can reply to.
SUPPORT_EMAIL = env('SUPPORT_EMAIL', 'hello@therightmolecule.com')
# Who gets a "new order" email for every paid order (comma-separated). Empty = nobody.
ORDER_NOTIFY_EMAILS = env_list('ORDER_NOTIFY_EMAILS')


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {'console': {'class': 'logging.StreamHandler'}},
    'loggers': {'store': {'handlers': ['console'], 'level': 'INFO'}},
}
