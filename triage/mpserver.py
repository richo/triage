import msgpackrpc
import mongoengine
import logging

from sys import argv
from pyramid.paster import get_appsettings
from models import Error

#logging
logging.basicConfig(level=logging.DEBUG)

# config
logging.info('Loading configuration')
settings = get_appsettings(argv[1], 'triage')

# mongo
logging.info('Connecting to mongo at: mongodb://' + settings['mongodb.host'] + '/' + settings['mongodb.db_name'])
mongoengine.connect(settings['mongodb.db_name'], host=settings['mongodb.host'])


class LoggingServer:
    def error(self, error):
        try:
            error = Error.create_from_msg(msg)
            error.save()
        except Exception, a:
            logging.exception('Failed to process error')        


logging.info('Creating server at ' + settings['errorserver.host'] + ':' + settings['errorserver.port'])
server = msgpackrpc.Server(LoggingServer())
server.listen(msgpackrpc.Address(settings['errorserver.host'], settings['errorserver.port']))
logging.info('Serving!')
server.start()