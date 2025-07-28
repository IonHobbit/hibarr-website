'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { audiences } from './options'
import { useMutation, useQuery } from '@tanstack/react-query'
import { makeN8NPOSTRequest } from '@/lib/services/n8n.service'
import { CampaignRequest } from '@/types/campaign'
import { Icon } from '@iconify/react/dist/iconify.js'
import { client } from '@/lib/sanity/client'
import { UtmDestinations, UtmMediums, UtmSources } from '@/types/sanity.types'

export default function TrackingForm() {
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    platformPage: '',
    audience: '',
    campaignName: '',
    postCreativeName: '',
    keyword: '',
    websitePageUrl: ''
  })
  const [trackingCode, setTrackingCode] = useState('');

  const { data: sourcesData } = useQuery({
    queryKey: ['tracking-sources'],
    queryFn: () => {
      return client.fetch<UtmSources[]>(`*[_type == "utmSources"]`)
    }
  })

  const { data: mediumsData } = useQuery({
    queryKey: ['tracking-mediums', formData.platform],
    queryFn: () => {
      const sourceID = sourcesData?.find(source => source.source === formData.platform)?._id;
      return client.fetch<UtmMediums[]>(`*[_type == "utmMediums" && source._ref == $sourceID]`, { sourceID })
    }
  })

  const { data: destinationsData } = useQuery({
    queryKey: ['tracking-destinations'],
    queryFn: () => {
      return client.fetch<UtmDestinations[]>(`*[_type == "utmDestinations"]`)
    }
  })

  const sources = sourcesData ?? []
  const mediums = mediumsData ?? []
  const destinations = destinationsData ?? []

  const generateTrackingCode = async (data: CampaignRequest) => {
    const utmParams = new URLSearchParams();
    if (data.platform) utmParams.append('utm_source', data.platform);
    if (data.platformPage) utmParams.append('utm_medium', data.platformPage);
    if (data.audience) utmParams.append('utm_audience', data.audience);
    if (data.keyword) utmParams.append('utm_term', data.keyword);
    if (data.postCreativeName) utmParams.append('utm_content', data.postCreativeName);
    if (data.campaignName) utmParams.append('utm_campaign', data.campaignName);
    if (data.websitePageUrl) utmParams.append('utm_destination', data.websitePageUrl);

    const trackingUrl = `${data.websitePageUrl}?${utmParams.toString()}`

    return trackingUrl
  }

  const { mutateAsync: shortenURL, isPending, isSuccess, reset } = useMutation({
    mutationFn: (data: { trackingUrl: string, title: string }) => {
      return makeN8NPOSTRequest<{ shortURL: string, originalURL: string }>('/shorten-url', data)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.platform || !formData.platformPage || !formData.websitePageUrl) {
      window.alert('Please fill in all fields')
      return
    }

    try {
      const trackingUrl = await generateTrackingCode(formData)
      const response = await shortenURL({ trackingUrl, title: formData.title })

      setTrackingCode(response.shortURL)

      setFormData({
        title: '',
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
              <p className="text-primary-foreground/80 text-sm">Generated Tracking URL:</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-mono font-bold text-primary-foreground">{trackingCode}</p>
                <Icon icon="mdi:content-copy" onClick={() => handleCopy(trackingCode)} className="text-primary-foreground/80 cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-center w-full gap-4">
              <Button
                onClick={() => reset()}
                className="bg-primary hover:bg-primary/90"
              >
                Add Another Entry
              </Button>
            </div>
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
          {/* Link Title */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Link Title <span className="text-red-400">*</span>
            </div>
            <Input
              name="title"
              type="text"
              placeholder="e.g. Linktree Webinar Link"
              value={formData.title}
              required
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-white/20 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
          </div>
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Platform  <span className="text-red-400">*</span>
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
                {sources.map((source) => (
                  <SelectItem key={source._id} value={source.source ?? ''}>
                    {source.source}
                  </SelectItem>
                ))}
                {sources.length === 0 && (
                  <div className='p-2'>
                    <p className='text-sm'>No platform found</p>
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Page on Platform */}
          {
            formData.platform && (
              <div className="space-y-2">
                <div className="text-primary-foreground font-medium">
                  Medium on Platform <span className="text-red-400">*</span>
                </div>
                <Select
                  value={formData.platformPage}
                  onValueChange={(value) => handleInputChange('platformPage', value)}
                  required
                >
                  <SelectTrigger className="bg-white/20 border-white/20 data-[placeholder]:text-primary-foreground/80 text-primary-foreground w-full">
                    <SelectValue placeholder="Select medium" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediums.map((medium) => (
                      <SelectItem key={medium._id} value={medium.medium ?? ''}>
                        {medium.medium}
                      </SelectItem>
                    ))}
                    {mediums.length === 0 && (
                      <div className='p-2'>
                        <p className='text-sm'>No medium found</p>
                      </div>
                    )}
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
            />
          </div>

          {/* Destination Page */}
          <div className="space-y-2">
            <div className="text-primary-foreground font-medium">
              Destination Page <span className="text-red-400">*</span>
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
                {destinations.map((destination) => (
                  <SelectItem key={destination._id} value={destination.url ?? ''}>
                    <div className="flex items-center justify-between gap-10 w-full">
                      <div className="flex flex-col items-start gap-0.5">
                        <p className=" text-sm">{destination.name}</p>
                        <p className=" text-xs">({destination.url})</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
                {destinations.length === 0 && (
                  <SelectItem value="None">No destination page found</SelectItem>
                )}
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