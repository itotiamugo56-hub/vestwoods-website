export const prerender = false;

// Configure these in .env file (create if missing)
// WEBHOOK_URL=https://your-webhook.com/leads
// EMAIL_TO=sales@vestwoods.com
// EMAIL_FROM=leads@vestwoods.com

export async function POST({ request }) {
  try {
    // Check if request has body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate required fields
    const required = ['name', 'email', 'projectSize_kWh', 'applicationType', 'timeline'];
    for (const field of required) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ success: false, message: `Missing required field: ${field}` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Log to console (always works)
    console.log('=== NEW LEAD SUBMISSION ===');
    console.log('Time:', body.timestamp || new Date().toISOString());
    console.log('Name:', body.name);
    console.log('Email:', body.email);
    console.log('Company:', body.company || '(not provided)');
    console.log('Phone:', body.phone || '(not provided)');
    console.log('Project Size:', body.projectSize_kWh);
    console.log('Application:', body.applicationType);
    console.log('Timeline:', body.timeline);
    console.log('Products:', body.productInterestIds?.join(', ') || '(none)');
    console.log('Message:', body.message || '(none)');
    console.log('Referrer:', body.referrer || '(direct)');
    console.log('User Agent:', body.userAgent);
    console.log('========================');
    
    // Try webhook if configured
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        console.log('Webhook sent successfully');
      } catch (webhookError) {
        console.error('Webhook failed:', webhookError.message);
        // Don't fail the whole request if webhook fails
      }
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Lead received' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}