export async function generateSpecSheet(product: any): Promise<Blob> {
  // This creates an HTML string that can be printed to PDF
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${product.name} - Spec Sheet</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          line-height: 1.6;
        }
        h1 {
          color: #1e40af;
          border-bottom: 2px solid #1e40af;
          padding-bottom: 10px;
        }
        .specs {
          margin: 20px 0;
          border-collapse: collapse;
          width: 100%;
        }
        .specs td, .specs th {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        .specs th {
          background-color: #f3f4f6;
          width: 30%;
        }
        .certifications {
          margin: 20px 0;
        }
        .cert-badge {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          margin: 4px;
          font-size: 12px;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>${product.name}</h1>
      <p>Technical Specifications Sheet - ${new Date().toISOString().split('T')[0]}</p>
      
      <table class="specs">
        <tr><th>Specification</th><th>Value</th></tr>
        ${product.specs.capacity_kWh ? `<tr><td>Capacity</td><td>${product.specs.capacity_kWh} kWh</td></tr>` : ''}
        ${product.specs.power_kW ? `<tr><td>Power</td><td>${product.specs.power_kW} kW</td></tr>` : ''}
        ${product.specs.voltage_V ? `<tr><td>Voltage</td><td>${product.specs.voltage_V} V</td></tr>` : ''}
        ${product.specs.cycles ? `<tr><td>Cycle Life</td><td>${product.specs.cycles} cycles</td></tr>` : ''}
        ${product.specs.chemistry ? `<tr><td>Chemistry</td><td>${product.specs.chemistry}</td></tr>` : ''}
        ${product.specs.efficiency ? `<tr><td>Efficiency</td><td>${product.specs.efficiency}</td></tr>` : ''}
        ${product.specs.dimensions_mm ? `<tr><td>Dimensions</td><td>${product.specs.dimensions_mm} mm</td></tr>` : ''}
        ${product.specs.weight_kg ? `<tr><td>Weight</td><td>${product.specs.weight_kg} kg</td></tr>` : ''}
      </table>
      
      <div class="certifications">
        <strong>Certifications:</strong><br>
        ${product.certifications.map((c: string) => `<span class="cert-badge">${c}</span>`).join('')}
      </div>
      
      <div class="footer">
        Vestwoods Energy Storage Solutions<br>
        For more information, contact sales@vestwoods.com
      </div>
    </body>
    </html>
  `;
  
  // Use browser's print functionality to generate PDF
  // This returns a blob that can be downloaded
  return new Blob([html], { type: 'text/html' });
}

export function downloadSpecSheet(product: any) {
  generateSpecSheet(product).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.slug}-spec-sheet.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}