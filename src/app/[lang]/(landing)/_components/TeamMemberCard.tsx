'use client';

import { generateImageUrl } from '@/lib/utils';
import { Team } from '@/types/sanity.types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';
import React from 'react'

type TeamMemberCardProps = {
	member: Team;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {

	if (!member.role) return null;

	return (
		<div key={member.name} className="flex flex-col gap-2 border p-4 bg-white w-full basis-full md:basis-[23.5%] min-w-[284px] md:min-w-[240px]">
			<div className="relative w-full h-80 md:h-52">
				<Image src={generateImageUrl(member.image as SanityImageSource).url() || ''} alt={member.name || ''} fill sizes="100%" className="object-cover object-top w-full h-full" loading='lazy' />
			</div>
			<div className="flex flex-col gap-1">
				<h4 className="text-lg md:text-xl">{member.name}</h4>
				<p className="text-muted-foreground text-sm md:text-base">{member.role}</p>
			</div>
		</div>
	)
}