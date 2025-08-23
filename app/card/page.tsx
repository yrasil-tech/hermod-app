'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
  RotateCcw,
  Shield,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Suspense, useState } from 'react';

interface ContactInfo {
  name: string;
  phone: string;
  title: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  photo: string;
}

function CardDisplay() {
  const searchParams = useSearchParams();
  const [isFlipped, setIsFlipped] = useState(false);

  const contactInfo: ContactInfo = {
    name: searchParams.get('name') || 'Nguyễn Thế Bảo',
    title: searchParams.get('title') || 'Phó trưởng phòng Phòng Tổ chức Hành chính',
    phone: searchParams.get('phone') || '0934357227',
    email: searchParams.get('email') || 'thebao@hcmute.edu.vn',
    website: searchParams.get('website') || 'https://hcmute.edu.vn/',
    github: searchParams.get('github') || '',
    linkedin: searchParams.get('linkedin') || '',
    twitter: searchParams.get('twitter') || '',
    photo: searchParams.get('photo') || '/images/profile-avatar.jpg',
  };

  const generateVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contactInfo.name}`,
      contactInfo.phone && `TEL:${contactInfo.phone}`,
      contactInfo.email && `EMAIL:${contactInfo.email}`,
      contactInfo.website && `URL:${contactInfo.website}`,
      contactInfo.github && `URL:https://github.com/${contactInfo.github}`,
      contactInfo.linkedin && `URL:https://linkedin.com/in/${contactInfo.linkedin}`,
      contactInfo.twitter && `URL:https://twitter.com/${contactInfo.twitter}`,
      'END:VCARD',
    ]
      .filter(Boolean)
      .join('\n');

    return vcard;
  };

  const downloadVCard = () => {
    const vcard = generateVCard();
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contactInfo.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-700 p-4'>
      <div className='absolute top-0 right-0 left-0 z-20 border-b border-gray-700 bg-gray-900/95 backdrop-blur-sm'>
        <div className='mx-auto flex max-w-4xl items-center justify-center gap-4 px-6 py-4'>
          <img src='/images/hcmute-logo.png' alt='HCMUTE Logo' className='h-12 w-12 object-contain' />
          <div className='text-center'>
            <h1 className='text-xl font-bold text-white'>
              Ho Chi Minh City University of Technology and Education
            </h1>
            <p className='text-sm text-gray-300'>Official Digital Business Card</p>
          </div>
        </div>
      </div>

      <div className='absolute top-6 right-6 z-10'>
        <Link href='/'>
          <Button
            variant='outline'
            className='gap-2 border-gray-600 bg-gray-800/90 text-gray-200 shadow-lg backdrop-blur-sm hover:bg-gray-700'
          >
            <ArrowLeft className='h-4 w-4' />
            Create Your Own
          </Button>
        </Link>
      </div>

      <div className='mx-auto max-w-2xl pt-32'>
        <div className='perspective-1000'>
          <div
            className={`transform-style-preserve-3d relative h-[600px] w-full cursor-pointer transition-transform duration-700 ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className='absolute inset-0 backface-hidden'>
              <Card className='hover:shadow-3xl h-full w-full border border-gray-600 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 shadow-2xl transition-shadow duration-300'>
                <CardContent className='flex h-full flex-col justify-center p-12'>
                  <div className='mb-10 text-center'>
                    {contactInfo.photo ? (
                      <img
                        src={contactInfo.photo || '/placeholder.svg'}
                        alt={contactInfo.name}
                        className='mx-auto mb-8 h-28 w-28 rounded-full border-4 border-blue-500/30 object-cover shadow-lg'
                      />
                    ) : (
                      <div className='mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-4xl font-bold text-white shadow-lg'>
                        {contactInfo.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </div>
                    )}
                    <h2 className='mb-2 text-4xl font-bold tracking-tight text-white'>{contactInfo.name}</h2>
                    <p className='mb-2 text-xl font-semibold tracking-tight text-gray-300'>
                      {contactInfo.title}
                    </p>
                    <p className='text-lg text-gray-300'>Click to view contact info</p>
                  </div>

                  <div className='mb-10 space-y-6'>
                    {contactInfo.phone && (
                      <div className='flex items-center gap-4 text-gray-200'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20'>
                          <Phone className='h-6 w-6 text-blue-400' />
                        </div>
                        <span className='text-lg font-medium'>{contactInfo.phone}</span>
                      </div>
                    )}

                    {contactInfo.email && (
                      <div className='flex items-center gap-4 text-gray-200'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20'>
                          <Mail className='h-6 w-6 text-blue-400' />
                        </div>
                        <span className='text-lg font-medium'>{contactInfo.email}</span>
                      </div>
                    )}

                    {contactInfo.website && (
                      <div className='flex items-center gap-4 text-gray-200'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20'>
                          <Globe className='h-6 w-6 text-blue-400' />
                        </div>
                        <span className='text-lg font-medium'>{contactInfo.website}</span>
                      </div>
                    )}
                  </div>

                  {(contactInfo.github || contactInfo.linkedin || contactInfo.twitter) && (
                    <>
                      <Separator className='my-10 bg-gray-600' />
                      <div className='flex justify-center gap-8'>
                        {contactInfo.github && (
                          <div className='flex flex-col items-center gap-3 text-gray-300'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-700'>
                              <Github className='h-6 w-6 text-gray-300' />
                            </div>
                            <span className='text-base font-medium'>{contactInfo.github}</span>
                          </div>
                        )}

                        {contactInfo.linkedin && (
                          <div className='flex flex-col items-center gap-3 text-gray-300'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-700'>
                              <Linkedin className='h-6 w-6 text-gray-300' />
                            </div>
                            <span className='text-base font-medium'>{contactInfo.linkedin}</span>
                          </div>
                        )}

                        {contactInfo.twitter && (
                          <div className='flex flex-col items-center gap-3 text-gray-300'>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-700'>
                              <Twitter className='h-6 w-6 text-gray-300' />
                            </div>
                            <span className='text-base font-medium'>{contactInfo.twitter}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className='absolute inset-0 rotate-y-180 backface-hidden'>
              <Card className='h-full w-full border border-gray-600 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 shadow-2xl'>
                <CardContent className='flex h-full flex-col justify-center p-12 text-center'>
                  <div className='mb-8'>
                    <h3 className='mb-4 text-3xl font-bold text-white'>Save to Contacts</h3>
                    <p className='mb-8 text-lg text-gray-300'>
                      Scan with your phone camera to instantly add this contact
                    </p>
                  </div>

                  <div className='mx-auto mb-8 inline-block rounded-xl bg-white p-8 shadow-inner'>
                    <QRCodeSVG
                      value={generateVCard()}
                      size={200}
                      level='M'
                      includeMargin={true}
                      fgColor='#1f2937'
                    />
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadVCard();
                    }}
                    className='mb-6 h-12 w-full bg-blue-600 text-lg text-white hover:bg-blue-700'
                  >
                    <Download className='mr-2 h-5 w-5' />
                    Download Contact File
                  </Button>

                  <p className='flex items-center justify-center gap-2 text-sm text-gray-400'>
                    <RotateCcw className='h-4 w-4' />
                    Click to flip back
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute right-0 bottom-0 left-0 border-t border-gray-700 bg-gray-900/95 backdrop-blur-sm'>
        <div className='mx-auto max-w-4xl px-6 py-4'>
          <div className='flex items-center justify-center gap-3 text-gray-300'>
            <Shield className='h-5 w-5 text-green-400' />
            <span className='text-sm font-medium'>
              This digital business card is verified and issued by HCMUTE
            </span>
            <div className='h-2 w-2 animate-pulse rounded-full bg-green-400'></div>
          </div>
          <p className='mt-1 text-center text-xs text-gray-400'>Authenticated • Secure • Official</p>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

export default function CardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardDisplay />
    </Suspense>
  );
}
