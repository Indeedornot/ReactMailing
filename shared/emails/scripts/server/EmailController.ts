import Imap from 'imap';
import {inspect} from 'util';
import {EmailModel} from '@/shared/emails/models/EmailModel';

const imap = new Imap({
  user: '',
  password: '',
  host: '',
  port: 993,
  tls: true,
});

function openInbox(cb: {(error: Error, mailbox: Imap.Box): void}) {
  imap.openBox('INBOX', true, cb);
}

export function getEmails(from: number, to: number): Promise<EmailModel[]> {
  return new Promise((resolve: (value: EmailModel[]) => void, reject) => {
    const emails: EmailModel[] = [];
    imap.once('ready', function () {
      openInbox(function (err, inbox) {
        if (err) throw err;
        const totalMessages = inbox.messages.total;

        if (from > totalMessages) return;
        if (to > totalMessages) to = totalMessages;
        if (from > to) throw new Error('from > to');

        to = totalMessages - to;
        from = totalMessages - from;

        const imapFetch = imap.seq.fetch(`${from}:${to}`, {
          bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
          struct: true,
        });

        //iterated once per message
        imapFetch.on('message', function (msg, seqno) {
          const email: EmailModel = {} as EmailModel;

          //console.log('Message #%d', seqno);
          const prefix = '(#' + seqno + ') ';

          //is iterated with Text + Header
          msg.on('body', function (stream, info) {
            let buffer = '';

            if (info.which === 'TEXT') {
              //console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
              stream.on('data', function (chunk) {
                buffer += chunk.toString();
              });
              stream.once('end', function () {
                email.Body = buffer;
              });
            } else {
              stream.on('data', function (chunk) {
                buffer += chunk.toString();
              });
              stream.once('end', function () {
                const headers = Imap.parseHeader(buffer);
                email.SenderName = headers.from[0];
                email.SenderEmail = headers.from[0];
                email.Subject = headers.subject[0];
                email.Date = headers.date[0];
              });
            }

            // stream.once('end', function () {
            //
            // });
          });

          // msg.once('attributes', function (attrs) {
          //     console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
          // });

          msg.once('end', function () {
            // console.log({
            //     'SenderName': email.SenderName,
            //     'SenderEmail': email.SenderEmail,
            //     'Subject': email.Subject,
            //     'Date': email.Date
            // });
            emails.push(email);
            console.log(prefix + 'Finished');
          });
        });

        imapFetch.once('error', function (err) {
          console.log('Fetch error: ' + err);
          reject(err);
        });
        imapFetch.once('end', function () {
          console.log('Done fetching all messages!');
          imap.end();
          resolve(emails);
        });
      });
    });

    imap.once('error', function (err: never) {
      console.log(err);
    });
    imap.once('end', function () {
      console.log('Connection ended');
      resolve(emails);
    });

    imap.connect();
  });
}

/*
let email : EmailModel = {} as EmailModel;

    console.log('Message #%d', seqno);
    const prefix = '(#' + seqno + ') ';

    msg.on('body', function (stream, info) {
        if (info.which === 'TEXT') console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
        let headerBuffer = '', bodyBuffer = '', count = 0;
*/
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
/*
stream.on('data', function(chunk) {
    count += chunk.length;
    if (info.which === 'TEXT') {
        email.Body = headerBuffer;
        console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
    }
    else
    {
        headerBuffer += chunk.toString();
    }
});
stream.once('end', function () {
    if(info.which !== 'TEXT') {
        let headers = Imap.parseHeader(headerBuffer);
        email.SenderEmail = headers.from[0];
        email.Date = headers.date[0];
        email.Subject = headers.subject[0];
        console.log(prefix + 'Parsed header: %s', inspect(headers));
    }
    console.log(email);
});
});

msg.once('attributes', function (attrs) {
    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
});

msg.once('end', function () {
    console.log(prefix + 'Finished');
});
 */
