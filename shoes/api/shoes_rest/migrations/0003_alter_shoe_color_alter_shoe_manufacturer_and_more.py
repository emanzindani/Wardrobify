# Generated by Django 4.0.3 on 2023-03-03 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_remove_binvo_bin_number_remove_binvo_bin_size_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoe',
            name='color',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='manufacturer',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='shoe',
            name='model_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]