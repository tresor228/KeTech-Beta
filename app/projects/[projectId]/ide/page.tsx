"use client"

import { useState } from "react"
import { ProjectIDELayout } from "@/components/ide/project-ide-layout"

export default function ProjectIDEPage({ params }: { params: { projectId: string } }) {
  return <ProjectIDELayout projectId={params.projectId} />
}

