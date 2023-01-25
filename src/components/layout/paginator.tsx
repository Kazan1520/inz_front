import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import {clsx} from "clsx";

export type PaginatorProps = {
    currentPage: number;
    paginator: (page: number) => void;
    pages: (number | string)[];
    lastPage: number;
}

export const Paginator = ({currentPage = 1, paginator, pages, lastPage}: PaginatorProps) => {
    return (
        <nav className="flex justify-between border-t border-gray-200 px-4 sm:px-0 pb-4">
            <div className="-mt-px flex w-0 flex-1">
                <button
                    className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 pl-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    onClick={() => {paginator( currentPage - 1)}}
                    disabled={currentPage === 1}
                >
                    <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Poprzednia strona
                </button>
            </div>
            {pages.map((page) => (
                page === '...' ?
                        <span key={'...'} className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                            ...
                        </span>

                    :

                    <button key={page}
                        className={clsx("inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ",
                            page === currentPage ? "border-indigo-500 text-indigo-600 hover:text-indigo-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700")}
                        onClick={() => {paginator(page as number)}}
                        >
                        {page}
                    </button>

                ),
            )}
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                    className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 pr-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    onClick={() => {paginator( currentPage + 1)}}
                    disabled={currentPage === lastPage}
                >
                    Następna strona
                    <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
            </div>
        </nav>
    )
}
