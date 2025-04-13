import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator = ({ shortUrl }) => {
  const urlToEncode = `${shortUrl}`;

  return (
    <div className="flex flex-col items-center mt-4">
      <p className="mb-2">Scan this QR code to visit your domain:</p>
      <QRCodeCanvas value={urlToEncode} size={180} bgColor="#ffffff" fgColor="#000000" />
      <p className="mt-2 text-sm break-all">{urlToEncode}</p>
    </div>
  );
};

export default QRGenerator;
