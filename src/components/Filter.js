import React from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

// * Paramnya nanti ada: item list, nama (type, accessible)
function Filter({ data, setter, name, selected }) {
  // TODO Statenya ini yang jadi universal state, jadi waktu pencet restart doa bakal based on state2nya
  return (
    <div className="w-max">
      <Listbox value={selected} onChange={setter}>
        <Listbox.Button className="py-2 px-3 border-gray-300 w-full border-[1px] rounded-md flex items-center justify-between focus:ring-2 focus:ring-yellow-200 ">
          <div>
            <span className="text-gray-600 mr-0.5">{name}:</span>{" "}
            {selected.name}
          </div>
          <ChevronDownIcon className="h-5 w-5 ml-2" />
        </Listbox.Button>
        <Listbox.Options className="z-50 bg-white w-full mt-2 rounded-md flex flex-col text-sm border-[1px] border-gray-300 fixed max-w-max">
          {data.map((d) => (
            <Listbox.Option
              key={d.id}
              value={d}
              className="cursor-pointer hover:bg-yellow-100 py-3 px-3"
            >
              {d.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default Filter;
