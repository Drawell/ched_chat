
from dataclasses import dataclass


@dataclass
class CommonAttribute:
    name: str
    attr_type: str
    default_value: str
    nullable: bool
    size: int


def parse_sql_columns(sql_columns: str) -> tuple[str, list[CommonAttribute]]:
    sql_columns = sql_columns.split('\n')
    table_name = get_table_name(sql_columns)

    attrs = []
    for column in sql_columns:
        attr = parse_column(column)
        if attr:
            attrs.append(attr)

    return table_name, attrs


def get_table_name(columns: list):
    if len(columns) < 2:
        return ''

    column = columns[1]
    column_attributes = column.split('\t')
    table_name = column_attributes[0].replace('"', '')
    return table_name


def parse_column(sql_column: str) -> CommonAttribute:
    sql_types_map = {
        'integer': 'int',
        'character varying': 'str',
        'text': 'str',
        'boolean': 'bool',
        'timestamp without time zone': 'datetime',
    }

    column_attributes = sql_column.split('\t')
    if len(column_attributes) < 4:
        return None

    name = column_attributes[1].replace('"', '')
    default_value = column_attributes[2].replace('"', '')

    nullable = column_attributes[3].replace('"', '')
    nullable = nullable != 'NO'

    attr_type = column_attributes[4].replace('"', '')
    attr_type = sql_types_map.get(attr_type.strip())

    size = None
    if len(column_attributes) >= 6:
        size = int(column_attributes[5])

    attr = CommonAttribute(name, attr_type, default_value, nullable, size)

    return attr


class CodeGen:
    def __init__(self, table_name: str, attrs: list[CommonAttribute], indent: str = '    '):
        self.table_name = table_name
        self.attrs = attrs
        self.indent = indent

    def generate_code(self):
        result = ''
        result += self.generate_name()
        result += self.indent + self.generate_post_name()
        for attr in self.attrs:
            result += self.indent + self.generate_attr(attr)
        result += self.indent + self.generate_post_attrs()
        return result

    def generate_name(self):
        return ''

    def generate_post_name(self):
        return ''

    def generate_attr(self, attr: CommonAttribute):
        return ''

    def generate_post_attrs(self):
        return ''


class SQLALchemyCodeGen(CodeGen):
    types_map = {
        'int': 'Integer',
        'str': 'String',
        'bool': 'Boolean',
        'datetime': 'DateTime',
    }

    def __init__(self, table_name: str, attrs: list[CommonAttribute]):
        super().__init__(table_name, attrs, indent='    ')

    def generate_name(self):
        if len(self.table_name) < 3:
            class_name = 'class TMP(Base)\n'
        else:
            class_name_snake = self.table_name[3:]
            words = class_name_snake.split('_')
            class_name = ''.join(x.title() for x in words)

        return f'class {class_name}(Base):\n'

    def generate_post_name(self):
        return f"__tablename__ = '{self.table_name}'\n\n"

    def generate_attr(self, attr: CommonAttribute):
        type_str = SQLALchemyCodeGen.types_map.get(attr.attr_type)
        default_str = self._handle_default(attr.default_value)
        nullable_str = ', nullable=False' if not attr.nullable else ''
        size_str = f'({attr.size})' if attr.size else ''

        return f'{attr.name} = Column({type_str}{size_str}{default_str}{nullable_str})\n'

    def _handle_default(self, default: str):
        if default == 'True':
            return ', default=True'
        elif default == 'CURRENT_TIMESTAMP':
            return ', default=func.now()'
        elif len(default) > 7 and default[:7] == 'nextval':
            return ', primary_key=True, autoincrement=True'
        else:
            return ''


class PydanticCodeGen(CodeGen):

    def __init__(self, table_name: str, attrs: list[CommonAttribute]):
        super().__init__(table_name, attrs, indent='    ')

    def generate_name(self):
        if len(self.table_name) < 3:
            class_name = 'class TMP(BaseModel)\n'
        else:
            class_name_snake = self.table_name[3:]
            words = class_name_snake.split('_')
            class_name = ''.join(x.title() for x in words)

        return f'class {class_name}(BaseModel):\n'

    def generate_post_name(self):
        return f'class Config:\n{self.indent * 2}orm_mode = True\n\n'

    def generate_attr(self, attr: CommonAttribute):
        return f'{attr.name}: {attr.attr_type}\n'
