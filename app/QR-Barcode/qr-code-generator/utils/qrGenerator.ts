import { buildContent, fileToDataUrl, roundedRect } from './qrUtils';

export const generateQRCode = async (
  contentType: string,
  values: any,
  setIsLoading: (loading: boolean) => void,
  qrCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  setQrCodeUrl: (url: string) => void
) => {
  const content = await buildContent(contentType, values);
  if (!content || !content.trim()) {
    alert('Please enter some content');
    return;
  }

  setIsLoading(true);
  try {
    const QRCode = (await import('qrcode')).toCanvas as any;

    if (content.startsWith('data:image')) {
      const len = content.length;
      if (len > 2950) {
        const ok = confirm('This image is too large to encode into a QR reliably. Try compressing the image or host it online and use the image URL instead. Proceed anyway?');
        if (!ok) {
          setIsLoading(false);
          return;
        }
      }
    }

    const size = Number(values.size) || 300;
    const margin = Number(values.margin) ?? 4;
    const errorCorrection = values.errorCorrection || 'M';

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const opts: any = {
      errorCorrectionLevel: errorCorrection,
      margin: margin,
      color: {
        dark: values.color,
        light: values.bgColor,
      },
      width: size,
    };

    await QRCode(canvas, content, opts);

    const ctx = canvas.getContext('2d')!;

    if (values.logo) {
      const logoDataUrl = URL.createObjectURL(values.logo);
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          let logoPercent = Number(values.logoSize) || 20;
          if (logoPercent > 25) logoPercent = 25;

          const maxLogoPx = Math.round((logoPercent / 100) * size);
          const logoW = maxLogoPx;
          const logoH = maxLogoPx;
          
          const radius = Math.max(8, Math.round(logoW * 0.12));
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const rectX = centerX - logoW / 2;
          const rectY = centerY - logoH / 2;

          ctx.save();
          ctx.fillStyle = '#ffffffff';
          ctx.beginPath();
          roundedRect(ctx, rectX - 6, rectY - 6, logoW + 12, logoH + 12, radius + 6);
          ctx.fill();
          ctx.restore();

          let drawW = logoW;
          let drawH = logoH;
          if (img.width > img.height) {
            drawH = Math.round((img.height / img.width) * drawW);
          } else if (img.height > img.width) {
            drawW = Math.round((img.width / img.height) * drawH);
          }
          const drawX = centerX - drawW / 2;
          const drawY = centerY - drawH / 2;

          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          resolve();
        };
        img.onerror = (err) => {
          console.error('Logo load error', err);
          reject(err);
        };
        img.src = logoDataUrl;
      });
    }

    const dataUrl = canvas.toDataURL('image/png');
    setQrCodeUrl(dataUrl);
    qrCanvasRef.current = canvas;
  } catch (err) {
    console.error('Error generating QR code:', err);
    alert('Error generating QR code. Please try again. Check console for details.');
  } finally {
    setIsLoading(false);
  }
};

export const downloadQRCode = (qrCanvasRef: React.RefObject<HTMLCanvasElement | null>, qrCodeUrl: string) => {
  if (!qrCanvasRef.current && !qrCodeUrl) return;
  
  let dataUrl = qrCodeUrl;
  if (!dataUrl && qrCanvasRef.current) {
    dataUrl = qrCanvasRef.current.toDataURL('image/png');
  }
  
  if (!dataUrl) return;

  fetch(dataUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};

export const shareQRCode = async (qrCodeUrl: string) => {
  if (!qrCodeUrl) return;
  
  try {
    // Check if Web Share API is available and supports files
    if (navigator.share && navigator.canShare) {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      
      // Check if the file can be shared
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'QR Code',
          files: [file],
        });
        return;
      }
    }
    
    // Fallback: Copy URL to clipboard
    await navigator.clipboard.writeText(qrCodeUrl);
    alert('QR Code URL copied to clipboard!');
    
  } catch (err) {
    console.error('Share failed:', err);
    
    // Final fallback
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      alert('QR Code URL copied to clipboard!');
    } catch (clipboardError) {
      console.error('Clipboard also failed:', clipboardError);
      alert('Unable to share. Please download the QR code instead.');
    }
  }
};