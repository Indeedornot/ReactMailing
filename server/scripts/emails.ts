import Imap from 'imap';
import {inspect} from 'util';

const imap = new Imap({
    user: '',
    password: '',
    host: '',
    port: 993,
    tls: true
});

function openInbox(cb: { (error: Error, mailbox: Imap.Box): void; }) {
    imap.openBox('INBOX', true, cb);
}

export function getEmails(from : number, to: number){
    imap.once('ready', function () {
        openInbox(function (err, inbox) {
            if (err) throw err;

            const totalMessages = inbox.messages.total;
            to = totalMessages - to;
            from = totalMessages - from;
            const f = imap.seq.fetch(`${from}:${to}`, {
                bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                struct: true
            });

            f.on('message', function (msg, seqno) {
                console.log('Message #%d', seqno);
                const prefix = '(#' + seqno + ') ';
                msg.on('body', function (stream, info) {
                    if (info.which === 'TEXT')
                        console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
                    let buffer = '', count = 0;

                    //body is passed in multiple chunks
                    /*
                        (#4975) Body ['TEXT'] (21155/133196)
                        (#4975) Body ['TEXT'] (29347/133196)
                        (#4975) Body ['TEXT'] (37539/133196)
                        (#4975) Body ['TEXT'] (45731/133196)
                        (#4975) Body ['TEXT'] (53923/133196)
                        (#4975) Body ['TEXT'] (62115/133196)
                        (#4975) Body ['TEXT'] (70307/133196)
                        (#4975) Body ['TEXT'] (78499/133196)
                        (#4975) Body ['TEXT'] (86691/133196)
                        (#4975) Body ['TEXT'] (94883/133196)
                        (#4975) Body ['TEXT'] (103075/133196)
                        (#4975) Body ['TEXT'] (111267/133196)
                        (#4975) Body ['TEXT'] (119459/133196)
                        (#4975) Body ['TEXT'] (133196/133196)
                    */
                    stream.on('data', function(chunk) {
                        count += chunk.length;
                        buffer += chunk.toString();
                        if (info.which === 'TEXT')
                            console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
                    });
                    stream.once('end', function () {
                        if(info.which !== 'TEXT') console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                    });
                });

                msg.once('attributes', function (attrs) {
                    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });

                msg.once('end', function () {
                    console.log(prefix + 'Finished');
                });
            });

            f.once('error', function (err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function () {
                console.log('Done fetching all messages!');
                imap.end();
            });
        });
    });

    imap.once('error', function (err: never) {
        console.log(err);
    });
    imap.once('end', function () {
        console.log('Connection ended');
    });

    imap.connect();
}