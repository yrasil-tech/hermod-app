"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QRCodeSVG } from "qrcode.react"
import { Phone, Mail, Globe, Github, Linkedin, Twitter, Share2, Eye, Upload, X } from "lucide-react"
import Link from "next/link"

interface ContactInfo {
  name: string
  phone: string
  email: string
  website: string
  github: string
  linkedin: string
  twitter: string
}

export default function NameCardPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "Nguyễn Quang Minh",
    phone: "0777674857",
    email: "minhnq.dev@gmail.com",
    website: "https://yrasil.dev",
    github: "minhnq0702",
    linkedin: "minhne-dev",
    twitter: "",
  })

  const [profilePhoto, setProfilePhoto] = useState<string | null>("/images/profile-avatar.jpg")

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setProfilePhoto(null)
  }

  const generateShareableUrl = () => {
    const params = new URLSearchParams()
    Object.entries(contactInfo).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    if (profilePhoto) {
      params.set("photo", profilePhoto)
    }
    return `/card?${params.toString()}`
  }

  const copyShareLink = async () => {
    const url = `${window.location.origin}${generateShareableUrl()}`
    await navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  const generateVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${contactInfo.name}`,
      `TEL:${contactInfo.phone}`,
      `EMAIL:${contactInfo.email}`,
      contactInfo.website && `URL:${contactInfo.website}`,
      contactInfo.github && `URL:https://github.com/${contactInfo.github}`,
      contactInfo.linkedin && `URL:https://linkedin.com/in/${contactInfo.linkedin}`,
      contactInfo.twitter && `URL:https://twitter.com/${contactInfo.twitter}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n")

    return vcard
  }

  const downloadVCard = () => {
    const vcard = generateVCard()
    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${contactInfo.name.replace(/\s+/g, "_")}.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const updateField = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Professional Name Card</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Create and share your digital business card with QR code technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="h-fit shadow-2xl border border-gray-700 bg-gray-900/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl text-white">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                Customize Your Card
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-200">Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {contactInfo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Label htmlFor="photo-upload" className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </span>
                      </Button>
                    </Label>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    {profilePhoto && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removePhoto}
                        className="bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-gray-700" />

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={contactInfo.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-11 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="h-11 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-11 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <Separator className="my-6 bg-gray-700" />

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-100">Online Presence</h3>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium text-gray-200">
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={contactInfo.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="h-11 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-sm font-medium text-gray-200">
                      GitHub Username
                    </Label>
                    <Input
                      id="github"
                      value={contactInfo.github}
                      onChange={(e) => updateField("github", e.target.value)}
                      placeholder="yourusername"
                      className="h-11 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-sm font-medium text-gray-200">
                      LinkedIn Username
                    </Label>
                    <Input
                      id="linkedin"
                      value={contactInfo.linkedin}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      placeholder="yourusername"
                      className="h-11 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-sm font-medium text-gray-200">
                      Twitter/X Username
                    </Label>
                    <Input
                      id="twitter"
                      value={contactInfo.twitter}
                      onChange={(e) => updateField("twitter", e.target.value)}
                      placeholder="yourusername"
                      className="h-11 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <Button onClick={downloadVCard} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
                  Download vCard File
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Link href={generateShareableUrl()} target="_blank">
                    <Button
                      variant="outline"
                      className="w-full h-11 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={copyShareLink}
                    className="w-full h-11 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 shadow-2xl border border-gray-600">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto || "/placeholder.svg"}
                        alt={contactInfo.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold">
                        {contactInfo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{contactInfo.name}</h2>
                </div>

                <div className="space-y-4 mb-8">
                  {contactInfo.phone && (
                    <div className="flex items-center gap-4 text-gray-200">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-base font-medium">{contactInfo.phone}</span>
                    </div>
                  )}

                  {contactInfo.email && (
                    <div className="flex items-center gap-4 text-gray-200">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-base font-medium">{contactInfo.email}</span>
                    </div>
                  )}

                  {contactInfo.website && (
                    <div className="flex items-center gap-4 text-gray-200">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-base font-medium">{contactInfo.website}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-8 bg-gray-600" />

                <div className="flex justify-center gap-6">
                  {contactInfo.github && (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Github className="w-5 h-5 text-gray-300" />
                      </div>
                      <span className="text-sm font-medium">{contactInfo.github}</span>
                    </div>
                  )}

                  {contactInfo.linkedin && (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Linkedin className="w-5 h-5 text-gray-300" />
                      </div>
                      <span className="text-sm font-medium">{contactInfo.linkedin}</span>
                    </div>
                  )}

                  {contactInfo.twitter && (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Twitter className="w-5 h-5 text-gray-300" />
                      </div>
                      <span className="text-sm font-medium">{contactInfo.twitter}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl border border-gray-700 bg-gray-900/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-white">Scan to Save Contact</CardTitle>
                <p className="text-sm text-gray-300">Point your camera at the QR code to add to contacts</p>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <div className="bg-white p-6 rounded-xl shadow-inner">
                  <QRCodeSVG value={generateVCard()} size={220} level="M" includeMargin={true} fgColor="#1f2937" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
