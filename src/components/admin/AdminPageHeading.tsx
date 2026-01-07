'use client';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';

interface AdminPageHeadingProps {
  title: string;
  description: string;
  onAddClick: () => void;
  buttonLabel: string;
  currentPage: string;
}

export default function AdminPageHeading({
  title,
  description,
  onAddClick,
  buttonLabel,
  currentPage,
}: AdminPageHeadingProps) {
  return (
    <div>
      <div className="text-accent">
        <nav aria-label="Back" className="sm:hidden">
          <Link
            href="/admin/dashboard"
            className="hover:text-drk-accent flex items-center text-sm font-medium"
          >
            <CaretLeft aria-hidden="true" size={20} className="mr-1 -ml-1 flex-shrink-0" />
            Back
          </Link>
        </nav>
        <nav aria-label="Breadcrumb" className="hidden sm:flex">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link href="/admin/dashboard" className="hover:text-drk-accent text-sm font-medium">
                  Dashboard
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center underline underline-offset-2">
                <CaretRight aria-hidden="true" size={20} className="flex-shrink-0" />
                <Link href={currentPage} className="hover:text-drk-accent ml-4 text-sm font-medium">
                  {title}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl leading-6 font-semibold">{title}</h1>
          <p className="text-neutral mt-2 text-sm">{description}</p>
        </div>
        <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={onAddClick}
            className="bg-accent hover:bg-accent/80 block cursor-pointer rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
