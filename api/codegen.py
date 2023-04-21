import re


sql_types_map = {
    'integer': 'Integer',
    'character varying': 'String',
    'text': 'Text',
    'boolean': 'Boolean',
    'timestamp without time zone': 'DateTime',

}


def _handle_default(default: str):
    if default == 'True':
        return ', default=True'
    elif default == 'CURRENT_TIMESTAMP':
        return ', default=func.now()'
    elif len(default) > 7 and default[:7] == 'nextval':
        return ', primary_key=True, autoincrement=True'
    else:
        return ''


def _generate_code_for_column(sql_column_str: str):
    column_attributes = sql_column_str.split('\t')
    if len(column_attributes) < 4:
        return ''

    column_name = column_attributes[1].replace('"', '')
    default_value = column_attributes[2].replace('"', '')
    nullable = column_attributes[3].replace('"', '')
    type = column_attributes[4].replace('"', '')
    size = None
    if len(column_attributes) >= 5:
        size = column_attributes[5]
    size_str = f'({size})' if size else ''

    default_str = _handle_default(default_value)
    nullable_str = ', nullable=False' if nullable == 'NO' else ''

    return f'{column_name} = Column({sql_types_map.get(type)}{size_str}{default_str}{nullable_str})'


def _get_table_name(columns: list):
    if len(columns) < 2:
        return ''

    column = columns[1]
    column_attributes = column.split('\t')
    table_name = column_attributes[0].replace('"', '')
    return table_name


def _get_class_name(table_name: str):
    if len(table_name) < 3:
        return 'class TMP(Base)'
    else:
        class_name_snake = table_name[3:]
        words = class_name_snake.split('_')
        class_name = ''.join(x.title() for x in words)
        return class_name


def generate_sqlalchemy_model(sql_columns_str: str):
    columns = sql_columns_str.split('\n')

    table_name = _get_table_name(columns)
    class_name = _get_class_name(table_name)
    result = '\n'
    result += f'class {class_name}(Base):\n'
    result += f"    __tablename__ = '{table_name}'\n"
    for item in columns:
        result += f'    {_generate_code_for_column(item)}\n'

    return result


sql_columns = '''
'''


print(generate_sqlalchemy_model(sql_columns))
