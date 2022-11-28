import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { useServerStatus } from 'src/hooks'
import { classNames } from 'src/utils'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Edouart Dalton XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    title: 'Data-scientist',
    email: 'Edouart.dalton@fournisseur.com',
    role: 'Administrator',
  },
  {
    name: 'Eva_Nescence_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    title: 'Data-',
    email: 'Eva.dupont@fai.com',
    role: 'Administrator',
  },
  // More people...
]

//var isRaw = "false"

export default function Test() {
  //   const isServerRunning = useServerStatus()
  const [isRaw, setIsRaw] = useState(false)

  return (
    <>
      {/* <div className="px-4 sm:px-6 lg:p-8 bg-slate-200 m-6"> */}
      <div className="sm:m-4 md:m-6 lg:m-8 sm:p-4 md:p-6 lg:p-8 m-2 bg-slate-200">
        <div className="grid grid-cols-10 grid-flow-row gap-4 p-2 bg-red-100">
          {/* <div className="col-start-1 col-span-6 bg-green-200">_01_</div> */}
          <div className="col-start-1 col-span-2 bg-green-200">_service_</div>
          {/* <div className="col-start-3 col-span-2 bg-green-200">_02_</div> */}
          <div className="col-start-3 col-span-8 bg-green-200">
            _valeur_du_service_
          </div>
          <div className="col-start-1 col-span-2 bg-green-200">_service_</div>
          <div className="col-start-3 col-span-8 bg-green-200">
            _valeur_du_service_
          </div>
          {people.map((person) => (
            <>
              <div
                key={person.email}
                className="col-start-1 col-span-2 flex flex-grow flex-col bg-green-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 overflow-auto shadow "
              >
                {person.name}
              </div>
              <div
                key={person.email}
                className="col-start-3 col-span-8 bg-green-200 px-3 py-4 text-sm text-gray-500"
              >
                {person.email}
              </div>
            </>
          ))}
        </div>
        <div className="sm:flex flex-grow-0 sm:items-center p-4 bg-red-100 m-2">
          {/* <div className="sm:flex-auto bg-indigo-300 m-2"> */}
          <p>Owner</p>
          <div className="sm:flex-auto bg-indigo-300 m-2">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <h1 className="text-xl font-semibold text-gray-900">Others</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </button>
          </div>
          <div>
            <span className="isolate inline-flex rounded-md shadow-sm">
              <label className="invisible">T</label>
              <button
                type="button"
                onClick={() => {
                  // setIsRaw((prev) => !prev)
                  setIsRaw((prev) => !prev)
                }}
                className={classNames(
                  isRaw ? 'bg-gray-300' : 'bg-gray-50',
                  'relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400/60 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                )}
              >
                Raw
              </button>
              <button
                type="button"
                onClick={() => {
                  // setIsRaw((prev) => !prev)
                  setIsRaw((prev) => !prev)
                }}
                className={classNames(
                  !isRaw ? 'bg-gray-300' : 'bg-gray-50',
                  'relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400/60 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                )}
              >
                View
              </button>
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.role}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <p>Nouveau paragraphe</p>
      <p>Nouveau paragraphe</p>
      <p>Nouveau paragraphe</p>
      <br />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border-6 border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Col 1</th>
              <th>Col 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ligne 1, col 1</td>
              <td>Ligne 1, col 2</td>
            </tr>
            <tr>
              <td>Ligne 2, col 1</td>
              <td>Ligne 2, col 2</td>
            </tr>
          </tbody>
        </table>{' '}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-emerald-300">
                    <tr>
                      <th>Col 1</th>
                      <th>Col 2</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td>Ligne 1, col 1</td>
                      <td>Ligne 1, col 2</td>
                    </tr>
                    <tr>
                      <td>Ligne 2, col 1</td>
                      <td>Ligne 2, col 2</td>
                    </tr>
                  </tbody>
                </table>
                <br></br>{' '}
                <table className="min-w-full divide-y divide-gray-300">
                  {/* <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role 
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead> */}
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-lime-700 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.role}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full grow">
        <header className="grow">
          <table className="grow border-separate border border-slate-400 ...">
            {/* <thead>
            <tr>
              <th className="border border-slate-300 ...">State</th>
              <th className="border border-slate-300 ...">City</th>
            </tr>
          </thead> */}
            <tbody className="">
              <tr className="">
                <td className="h-full border border-slate-300 ...">Indiana</td>
                <td className="grow w-full h-full border border-slate-300 ...">
                  Indianapolis
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 ...">Ohio</td>
                <td className="border border-slate-300 ...">Columbus</td>
              </tr>
              <tr>
                <td className="border border-slate-300 ...">Michigan</td>
                <td className="border border-slate-300 ...">Detroit</td>
              </tr>
            </tbody>
          </table>{' '}
        </header>
      </div>
      <h1 className="font-black text-lg top-0 right-0 bottom-0 left-0 w-full h-full hover:opacity-60 hover:bg-sky-300 transition duration-300">
        Test les hovers effects
      </h1>
      <div className="grid grid-cols-4 gap-4 m-5 text-center ">
        <div className="border-2 border-indigo-600">01</div>
        <div className="border-2 border-indigo-600">02</div>
        <div className="border-2 border-indigo-600">03</div>
        <div className="col-span-2 border-2 border-indigo-600">
          04
          <ol className="flex flex-grow flex-col bg-yellow-500">
            <li>toto</li>
            <li>titi</li>
          </ol>
        </div>
        <div className="border-2 border-indigo-600 grid-columns-12">05</div>
        <div className="border-2 border-indigo-600">06</div>
        <div className="col-span-2 border-2 border-indigo-600">07</div>
      </div>{' '}
      <div className="flex text-slate-600 bg-slate-100">
        <label htmlFor="inputName" className="font-bold mr-2 bg-orange-300">
          Message:
        </label>
        <label htmlFor="inputName" className="font-bold mr-2 bg-orange-300">
          suivant :
        </label>
        <ol className="flex flex-grow flex-col bg-yellow-500">
          <li>toto</li>
          <li>titi</li>
        </ol>
      </div>
      <br></br>
      <div className="mb-4 md:mb-0">
        {/* <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs"> */}
        {/* <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs"> */}
        {/* <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs"> */}
        <div className="">
          <label className="relative top-0 right-0 bottom-0 left-0 w-full h-full hover:opacity-60 hover:bg-sky-300 transition duration-300 ease-in-out bg-red-400">
            Aimez-vous les choux fleurs ?<br></br>
          </label>
          {/* <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" className="max-w-xs" alt="Louvre" /> */}
          {/* <label className="relative top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-60 transition duration-300 ease-in-out bg-blue-400">Aimez-vous les petits pois ?
        </label> */}
          <label className="relative top-0 right-0 bottom-0 left-0 w-full h-full bg-fixed opacity-0 hover:opacity-60 transition duration-300 ease-in-out bg-blue-400">
            Aimez-vous les petits pois ?
          </label>
          {/* <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-60 transition duration-300 ease-in-out bg-blue-400">
        </div> */}
          <br></br>
          <label className="relative top-0 right-0 bottom-0 left-0 w-full h-full hover:opacity-60 hover:bg-sky-300 transition duration-300 ease-in-out bg-red-400">
            Aimez-vous les haricots verts ?
          </label>
        </div>
      </div>
    </>
  )
}
