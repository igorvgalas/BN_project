from django.test import TestCase

from models import Order


class TestOrm(TestCase):

    def test_query(self):
        q = Order.objects.select_related('client')
        print(q.query)


a = TestOrm()
a.test_query()
