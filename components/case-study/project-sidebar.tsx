import { ProjectMetadata } from '@/lib/types'
import { Building2, Users, MapPin, Calendar, Wrench } from 'lucide-react'
import Image from 'next/image'

interface ProjectSidebarProps {
  metadata: ProjectMetadata
}

export function ProjectSidebar({ metadata }: ProjectSidebarProps) {
  return (
    <aside className="project-sidebar">
      {/* Company Logo Header */}
      <div className="mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          {/* Logo */}
          {metadata.companyLogo ? (
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center p-2">
              <Image
                src={metadata.companyLogo}
                alt={metadata.company}
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-2xl font-bold">
              {metadata.company.charAt(0)}
            </div>
          )}

          {/* Company Name & Product */}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-foreground leading-tight">
              {metadata.company}
            </h2>
            {metadata.productName && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {metadata.productName}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-3 pb-3 border-b border-border">
        <h3 className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">
          Overview
        </h3>
        <p className="text-xs leading-tight text-muted-foreground">
          {metadata.overview}
        </p>
      </div>

      {/* Sector */}
      <div className="mb-3 pb-3 border-b border-border">
        <div className="flex items-start gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-foreground mb-0.5">Sector</div>
            <div className="text-xs text-muted-foreground">{metadata.sector}</div>
          </div>
        </div>
      </div>

      {/* Team Size */}
      <div className="mb-3 pb-3 border-b border-border">
        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-foreground mb-0.5">Team Size</div>
            <div className="text-xs text-muted-foreground">{metadata.teamSize}</div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-3 pb-3 border-b border-border">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-foreground mb-0.5">Location</div>
            <div className="text-xs text-muted-foreground">{metadata.location}</div>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-3 pb-3 border-b border-border">
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-foreground mb-0.5">Duration</div>
            <div className="text-xs text-muted-foreground">{metadata.duration}</div>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="mb-3">
        <div className="flex items-start gap-2">
          <Wrench className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold text-foreground mb-1">Tools Used</div>
            <div className="flex flex-wrap gap-1">
              {metadata.tools.map((tool, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <button
            className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Share on Twitter"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button
            className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
          <button
            className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy link"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
