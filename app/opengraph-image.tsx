import { ImageResponse } from 'next/og'

export const alt = 'The Quiet Bloom - A Digital Sanctuary for Thoughtful Living'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#fdfcfb',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        background: '#292524',
                        borderRadius: '50%',
                        marginBottom: '40px',
                    }}
                />
                <h1
                    style={{
                        fontSize: '80px',
                        fontFamily: 'serif',
                        color: '#292524',
                        textAlign: 'center',
                        margin: '0 0 20px 0',
                        fontWeight: '300',
                    }}
                >
                    The Quiet Bloom
                </h1>
                <p
                    style={{
                        fontSize: '32px',
                        color: '#57534e',
                        textAlign: 'center',
                        maxWidth: '800px',
                        lineHeight: '1.4',
                        margin: '0',
                    }}
                >
                    A digital sanctuary for thoughtful living, slow reflections, and intentional presence.
                </p>
            </div>
        ),
        {
            ...size,
        }
    )
}
