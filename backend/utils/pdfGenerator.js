import { PDFDocument, rgb, StandardFonts,PageSizes, registerFontkit  } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit"; 


async function generatePDFBill(orderDetails) {
  const pdfDoc = await PDFDocument.create();

  pdfDoc.registerFontkit(fontkit)

  const fontBytes = await fetch("asset/fonts/NeueMontreal-Regular.otf").then((res) => res.arrayBuffer());
  const font = await pdfDoc.embedFont(fontBytes);
  const page = pdfDoc.addPage(PageSizes.A4);
  const { width, height } = page.getSize();
  const invoiceText = "Tee Bill Receipt";
  const textWidth = font.widthOfTextAtSize(invoiceText, 12);
  const lineSpacing = 1.2; // Adjust this value for desired line spacing

  let y = height - 100;
  const xCenter = (width - textWidth) / 2;


  page.drawText(invoiceText, { x: xCenter, y: height - 15, font, size: 12, color: rgb(0, 0, 0) });

  // Add more text and order details to the page
  
  
  const item = orderDetails.product.length
  for (let i = 0; i < item; i++) {
    page.drawText(`Item: ${i+1}`, { x: 50, y, font, size: 16, color: rgb(0, 0, 0) });
    y -= 16 * lineSpacing;
    page.drawText(`Product/s: ${orderDetails.product[i].name}`, { x: 50, y, font, size: 16, color: rgb(0, 0, 0) });
    y -= 16 * lineSpacing;
    page.drawText(`Quantity: ${orderDetails.product[i].quantity}`, { x: 50, y, font, size: 14, color: rgb(0, 0, 0) });
    y -= 16 * lineSpacing;
    page.drawText(`Price: ${orderDetails.product[i].price}`, { x: 50, y, font, size: 12, color: rgb(0, 0, 0) });
    y -= 32 * lineSpacing;
}
    page.drawText(`Total Bill: ${orderDetails.cart}`, { x: 50, y, font, size: 20, color: rgb(0, 0, 0) });

    page.drawText(`Address: ${orderDetails.address.street},${orderDetails.address.city},${orderDetails.address.state}, ${orderDetails.address.country}`, { x: 50, y:y-40, font, size: 20, color: rgb(0, 0, 0) });
  
  
  // Add other order details

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export default generatePDFBill;
