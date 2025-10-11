export const fileToDataUrl = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = reader.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  const min = Math.min(w, h) / 2;
  if (r > min) r = min;
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

export const buildContent = async (contentType: string, values: any): Promise<string> => {
  switch (contentType) {
    case 'text':
      return values.text || '';
    case 'url':
      return values.url ? (values.url.startsWith('http') ? values.url : `https://${values.url}`) : '';
    case 'phone':
      return values.phone ? `tel:${values.phone}` : '';
    case 'email':
      return values.email ? `mailto:${values.email}?subject=${encodeURIComponent(values.emailSubject || '')}&body=${encodeURIComponent(values.emailBody || '')}` : '';
    case 'sms':
      return values.smsNumber ? `sms:${values.smsNumber}?body=${encodeURIComponent(values.sms)}` : '';
    case 'wifi':
      return values.wifiSsid ? `WIFI:S:${values.wifiSsid};T:WPA;P:${values.wifiPassword};;` : '';
    case 'event': {
      const eventDate = values.eventDate ? new Date(values.eventDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';
      return `BEGIN:VEVENT\nSUMMARY:${values.eventTitle}\nDTSTART:${eventDate}\nLOCATION:${values.eventLocation}\nEND:VEVENT`;
    }
    case 'contact':
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${values.contactName}\nTEL:${values.contactPhone}\nEMAIL:${values.contactEmail}\nORG:${values.contactCompany}\nEND:VCARD`;
    case 'payment':
      return `upi://pay?pa=${values.contactEmail}&pn=${values.contactName}&am=${values.paymentAmount}&cu=${values.paymentCurrency}&tn=${values.paymentNote}`;
    case 'image': {
      if (!values.imageFile) return '';
      try {
        const dataUrl = await fileToDataUrl(values.imageFile, 600, 0.6);
        return dataUrl;
      } catch (err) {
        console.error('Error converting image to data URL', err);
        return '';
      }
    }
    default:
      return '';
  }
};