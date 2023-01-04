menu = [{'title': 'Манікюр', 'url_name': 'manicure'},
        {'title': 'Педикюр', 'url_name': 'pedicure'},
        {'title': 'Нарощення нігтів', 'url_name': 'addnails'},
        {'title': 'Догляд брів', 'url_name': 'eyes'}
        ]


class DataMixin:
    def get_context_data(self, **kwargs):
        context = kwargs
        context['menu'] = menu
        if 'cat_selected' not in context:
            context['cat_selected'] = 0
        return context
