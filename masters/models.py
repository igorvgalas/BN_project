from django.db import models


class Master(models.Model):
    name = models.CharField(max_length=30)
    experience = models.IntegerField()
    age = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'masters'
