'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { audiences, websitePages } from './options'
import { useMutation, useQuery } from '@tanstack/react-query'
import { makeGETRequest, makePOSTRequest } from '@/lib/services/api.service'
import { Campaign, CampaignRequest, Platform, PlatformPage } from '@/types/campaign'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function TrackingForm() {
  const [formData, setFormData] = useState({
    platform: '',
    platformPage: '',
    audience: '',
    campaignName: '',
    postCreativeName: '',
    keyword: '',
    websitePageUrl: ''
  })
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');

  const { data: platformsData } = useQuery({
    queryKey: ['platforms'],
    queryFn: () => {
      return makeGETRequest<Platform[]>('/platforms')
    }
  })

  const { data: platformPagesData } = useQuery({
    queryKey: ['platformPages'],
    queryFn: () => {
      return makeGETRequest<PlatformPage[]>('/platform-pages')
    }
  })

  const platforms = platformsData?.data ?? []
  const platformPages = (platformPagesData?.data ?? []).filter(page => page.platform.name === formData.platform)

  const { mutateAsync: createCampaign, isPending, isSuccess, reset } = useMutation({
    mutationFn: (data: CampaignRequest) => {
      return makePOSTRequest<Campaign>('/campaigns', data)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await createCampaign(formData)

      setTrackingCode(response.data.code)
      setTrackingUrl(response.data.trackingUrl)

      setFormData({
        platform: '',
        platformPage: '',
        audience: '',
        campaignName: '',
        postCreativeName: '',
        keyword: '',
        websitePageUrl: ''
      })
    } catch (error) {
      console.error('Error submitting tracking data:', error)
    }
  }

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text)
      window.alert('Copied to clipboard')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isSuccess) {
    return (
      <Card className="bg-white/20 backdrop-blur-sm border-white/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-foreground mb-2">
              Tracking Data Submitted!
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Your campaign tracking information has been successfully recorded.
            </p>
            <div className="bg-white/20 flex flex-col items-center gap-2 backdrop-blur-sm rounded-lg p-4 mb-4">
              <p className="text-primary-foreground/80 text-sm">Generated Tracking Code:</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-mono font-bold text-primary-foreground">{trackingCode}</p>
                <Icon icon="mdi:content-copy" onClick={() => handleCopy(trackingCode)} className="text-primary-foreground/80 cursor-pointer" />
              </div>
            </div>
            <div className="bg-white/20 flex flex-col items-center gap-2 backdrop-blur-sm rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <p className="text-primary-foreground/80 text-sm">Generated Tracking URL:</p>
                <Icon icon="mdi:content-copy" onClick={() => handleCopy(trackingUrl)} className="text-primary-foreground/80 cursor-pointer" />
              </div>
              <div className="break-all">
                <p className="text-sm font-mono text-primary-foreground">{trackingUrl}</p>
              </div>
            </div>
            <Button
              onClick={() => reset()}
              className="bg-primary hover:bg-primary/90"
            >
              Add Another Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/20 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-primary-foreground text-2xl">Link Tracking Form</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Enter your campaign details to track performance across platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Platform Selection */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Platform
            </div>
            <Select
              value={formData.platform}
              onValueChange={(value) => handleInputChange('platform', value)}
              required
            >
              <SelectTrigger className="bg-white/20 border-white/20 data-[placeholder]:text-primary-foreground/80 text-primary-foreground w-full">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.name}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page on Platform */}
          {
            formData.platform && (
              <div className="space-y-2">
                <div className="text-primary-foreground font-medium">
                  Page on Platform
                </div>
                <Select
                  value={formData.platformPage}
                  onValueChange={(value) => handleInputChange('platformPage', value)}
                  required
                >
                  <SelectTrigger className="bg-white/20 border-white/20 data-[placeholder]:text-primary-foreground/80 text-primary-foreground w-full">
                    <SelectValue placeholder="Select page" />
                  </SelectTrigger>
                  <SelectContent>
                    {platformPages.filter(page => page.platform.name === formData.platform).map((page) => (
                      <SelectItem key={page.id} value={page.name}>
                        {page.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          }

          {/* Audience */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Audience
            </div>
            <Select
              value={formData.audience}
              onValueChange={(value) => handleInputChange('audience', value)}
              required
            >
              <SelectTrigger className="bg-white/20 border-white/20 data-[placeholder]:text-primary-foreground/80 text-primary-foreground w-full">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((audience) => (
                  <SelectItem key={audience.value} value={audience.value}>
                    {audience.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campaign Name */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Campaign Name
            </div>
            <Input
              id="campaignName"
              type="text"
              placeholder="e.g. Turkish Campaign"
              value={formData.campaignName}
              onChange={(e) => handleInputChange('campaignName', e.target.value)}
              className="bg-white/20 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
              required
            />
          </div>

          {/* Creative/Post Name */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Name of Post/Creative
            </div>
            <Input
              id="postCreativeName"
              type="text"
              placeholder="e.g., North Cyprus Property Tour, Investment Guide"
              value={formData.postCreativeName}
              onChange={(e) => handleInputChange('postCreativeName', e.target.value)}
              className="bg-white/20 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
              required
            />
          </div>

          {/* Keyword */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Keyword
            </div>
            <Input
              id="keyword"
              type="text"
              placeholder="e.g., northcyprus, investment, property"
              value={formData.keyword}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
              className="bg-white/20 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
              required
            />
          </div>

          {/* Destination Page */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Website Page
            </div>
            <Select
              value={formData.websitePageUrl}
              onValueChange={(value) => handleInputChange('websitePageUrl', value)}
              required
            >
              <SelectTrigger className="bg-white/20 border-white/20 data-[placeholder]:text-primary-foreground/80 text-primary-foreground w-full">
                <SelectValue placeholder="Select destination page" />
              </SelectTrigger>
              <SelectContent>
                {websitePages.map((page) => (
                  <SelectItem key={page.value} value={page.value}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit Tracking Data'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 