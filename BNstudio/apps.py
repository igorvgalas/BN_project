from django.apps import AppConfig


class BnstudioConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'BNstudio'

    def ready(self) -> None:
        import BNstudio.signals.handlers