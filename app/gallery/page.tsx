import type { Metadata } from "next";import SectionHeader from "@/components/SectionHeader";import GalleryGrid from "@/components/GalleryGrid";
export const metadata:Metadata={title:"Gallery",description:"Boys Brigade gallery and archive."};
export default function Gallery(){return <section className="section-pad min-h-screen bg-night bg-grid bg-[size:42px_42px] pt-28 sm:pt-32"><div className="container-pad"><SectionHeader title="Archive Extraction" subtitle="Moments from parades, camps, drills, training, and service operations."/><GalleryGrid/></div></section>}
