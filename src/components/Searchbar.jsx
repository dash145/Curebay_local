import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'
function SearchBar() {
    return (
        <div className= "bg-brand-lightblue flex justify-center py-12 w-full">
        <div className="bg-white flex rounded-lg">
            <div className="bg-white-dark flex items-center w-full shadow-xl">
                 <div>
                    <p className="text-sm"><b>Location</b></p>
                    <p className="text-xs">Home - Happy valley..</p>
                </div>

                    <div className="ml-4">
                        <p className="text-black"><b>Looking for</b></p>
                        <p className="text-sm">All</p>
                    </div>

                    <div className="ml-4">
                        <p className="text-black">I have cold</p>
                    </div>

                    <div className="p-1 ml-24">
                        <button className="text-white bg-brand-primary rounded-lg hover:bg-blue-400 focus:outline-none p-2 flex items-center justify-center">
                            <SearchIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBar;
