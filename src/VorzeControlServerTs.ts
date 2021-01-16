import SerialPort from 'serialport';
import {isNumber, isBoolean} from 'lodash';

SerialPort.list().then(async T => {
    console.log('list', T);


    const port = new SerialPort('COM3', {
        baudRate: 19200
    });

    port.on('error', (err) => {
        console.error('Error: ', err);
    });

    const closeIt = () => {
        port.close(error => {
            if (error) {
                console.error('close:', error);
            }
            console.log('close ok');
        });
    };

    const sendCmd = (rotate: boolean | number, speed: number) => {
        // https://github.com/Net005/Vorze-PlayerHelper/blob/master/VorzeHelper.cs
        const cmd = Buffer.alloc(3);
        if (speed < 0) {
            speed = 0;
        }
        if (speed > 100) {
            speed = 100;
        }
        const data = (rotate ? 1 : 0) * 0x80 + speed;
        console.log(data);
        cmd[0] = 1;
        cmd[1] = 1;
        cmd[2] = data;
        port.write(cmd, (error, bytesWritten) => {
            if (error) {
                console.error('close:', error);
            }
            console.log('bytesWritten:', bytesWritten);
        });
    };

    const stop = () => {
        const cmd = Buffer.alloc(3);
        cmd[0] = 1;
        cmd[1] = 1;
        cmd[2] = 0;
        port.write(cmd, (error, bytesWritten) => {
            if (error) {
                console.error('close:', error);
            }
            console.log('bytesWritten:', bytesWritten);
        });
    };

    port.on('open', () => {
        console.log('open ok');
        setTimeout(() => sendCmd(1, 100), 1000);
        setTimeout(() => sendCmd(0, 100), 2000);
        setTimeout(stop, 4000);
        setTimeout(closeIt, 5000);
    });

    port.on('data', (data) => {
        console.log('Data:', data);
    });


});
