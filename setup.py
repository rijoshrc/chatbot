from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

setup(
	name='chatbot',
	version="1.0.0",
	description='Test',
	author='Rijosh',
	author_email='rijosh.dev@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)