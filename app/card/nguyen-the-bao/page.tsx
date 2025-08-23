"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QRCodeSVG } from "qrcode.react";
import { Phone, Mail, Globe, Github, Linkedin, Twitter, Download, ArrowLeft, RotateCcw, Shield } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

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
    name: searchParams.get("name") || "Nguyễn Thế Bảo",
    title: searchParams.get("title") || "Phó trưởng phòng Phòng Tổ chức Hành chính",
    phone: searchParams.get("phone") || "0934357227",
    email: searchParams.get("email") || "thebao@hcmute.edu.vn",
    website: searchParams.get("website") || "https://hcmute.edu.vn/",
    github: searchParams.get("github") || "",
    linkedin: searchParams.get("linkedin") || "",
    twitter: searchParams.get("twitter") || "",
    photo: searchParams.get("photo") || "/images/nguyen-the-bao.jpg",
  };

  const generateVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${contactInfo.name}`,
      contactInfo.phone && `TEL:${contactInfo.phone}`,
      contactInfo.email && `EMAIL:${contactInfo.email}`,
      contactInfo.website && `URL:${contactInfo.website}`,
      contactInfo.github && `URL:https://github.com/${contactInfo.github}`,
      contactInfo.linkedin && `URL:https://linkedin.com/in/${contactInfo.linkedin}`,
      contactInfo.twitter && `URL:https://twitter.com/${contactInfo.twitter}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");

    return vcard;
  };

  const downloadVCard = () => {
    const vcard = generateVCard();
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contactInfo.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-700 ">
      <div className="w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-3 sm:gap-4">
          <img src="/images/hcmute-logo.png" alt="HCMUTE Logo" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
          <div className="text-center">
            <h1 className="text-base sm:text-xl font-bold text-white leading-tight">
              Ho Chi Minh City University of Technology and Education
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">Official Digital Business Card</p>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="perspective-1000">
            <div
              className={`relative w-full h-[480px] sm:h-[600px] transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="absolute inset-0 backface-hidden">
                <Card className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 shadow-2xl border border-gray-600 hover:shadow-3xl transition-shadow duration-300">
                  <CardContent className="p-6 sm:p-12 h-full flex flex-col justify-center">
                    <div className="text-center mb-6 sm:mb-10">
                      {contactInfo.photo ? (
                        <img
                          src={contactInfo.photo || "/placeholder.svg"}
                          alt={contactInfo.name}
                          className="w-20 h-20 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 sm:mb-8 object-cover shadow-lg border-4 border-blue-500/30"
                        />
                      ) : (
                        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-full mx-auto mb-6 sm:mb-8 flex items-center justify-center text-white text-2xl sm:text-4xl font-bold shadow-lg">
                          {contactInfo.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}
                      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                        {contactInfo.name}
                      </h2>
                      <p className="text-base sm:text-xl font-semibold text-gray-300 mb-2 tracking-tight">
                        {contactInfo.title}
                      </p>
                      <p className="text-gray-300 text-sm sm:text-lg">Click to view contact info</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-10">
                      {contactInfo.phone && (
                        <div className="flex items-center gap-3 sm:gap-4 text-gray-200">
                          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                          </div>
                          <span className="text-sm sm:text-lg font-medium">{contactInfo.phone}</span>
                        </div>
                      )}

                      {contactInfo.email && (
                        <div className="flex items-center gap-3 sm:gap-4 text-gray-200">
                          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                          </div>
                          <span className="text-sm sm:text-lg font-medium break-words">{contactInfo.email}</span>
                        </div>
                      )}

                      {contactInfo.website && (
                        <div className="flex items-center gap-3 sm:gap-4 text-gray-200">
                          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                            <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                          </div>
                          <span className="text-sm sm:text-lg font-medium break-all">{contactInfo.website}</span>
                        </div>
                      )}
                    </div>

                    {(contactInfo.github || contactInfo.linkedin || contactInfo.twitter) && (
                      <>
                        <Separator className="my-6 sm:my-10 bg-gray-600" />
                        <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
                          {contactInfo.github && (
                            <div className="flex flex-col items-center gap-2 sm:gap-3 text-gray-300">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                              </div>
                              <span className="text-xs sm:text-base font-medium break-all">{contactInfo.github}</span>
                            </div>
                          )}
                          {contactInfo.linkedin && (
                            <div className="flex flex-col items-center gap-2 sm:gap-3 text-gray-300">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                              </div>
                              <span className="text-xs sm:text-base font-medium break-all">{contactInfo.linkedin}</span>
                            </div>
                          )}
                          {contactInfo.twitter && (
                            <div className="flex flex-col items-center gap-2 sm:gap-3 text-gray-300">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                              </div>
                              <span className="text-xs sm:text-base font-medium break-all">{contactInfo.twitter}</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <Card className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 shadow-2xl border border-gray-600">
                  <CardContent className="p-6 sm:p-12 h-full flex flex-col justify-center text-center">
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Save to Contacts</h3>
                      <p className="text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8">
                        Scan with your phone camera to instantly add this contact
                      </p>
                    </div>

                    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-inner mb-6 sm:mb-8 inline-block mx-auto">
                      <QRCodeSVG value={generateVCard()} size={150} level="M" includeMargin={true} fgColor="#1f2937" />
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadVCard();
                      }}
                      className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-lg mb-4 sm:mb-6"
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Download Contact File
                    </Button>

                    <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2">
                      <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                      Click to flip back
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-gray-300 flex-wrap text-center">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            <span className="text-xs sm:text-sm font-medium">
              This digital business card is verified and issued by HCMUTE
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-1">Authenticated • Secure • Official</p>
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
