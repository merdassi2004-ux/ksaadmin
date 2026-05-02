import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // In production, use environment variable. Fallback to 'admin123' for local testing.
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === validPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set an HTTP-only cookie for authentication
      response.cookies.set('admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_auth');
  return response;
}
