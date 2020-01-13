# Generated by Django 3.0.2 on 2020-01-13 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expenseName', models.CharField(max_length=256)),
                ('value', models.PositiveIntegerField()),
                ('payPeriodType', models.IntegerField(choices=[(1, 'Year'), (12, 'Month'), (23, 'Semimonthly'), (26, 'Biweekly'), (52, 'Weekly'), (365, 'Daily')])),
            ],
        ),
    ]