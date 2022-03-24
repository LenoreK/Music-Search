import {useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import Searchbar from './components/Searchbar';
import { DataContext } from './context/DataContext';
import { searchContext } from './context/SearchContext';
import AlbumView from './components/AlbumView.js';
import ArtistView from 'src/components/ArtistView.js.'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if(search) {
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch(API_URL + search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<div>
			<Searchbar handleSearch = {handleSearch}/>
			{message}
			<Router>
				<Routes>
				<Route path='/' element={
					<Fragment>
						<searchContext.Provider value={{term: searchInput, handleSearch}}>
							<Searchbar />
						</searchContext.Provider>
						{message}
						<DataContext.Provider value={data}>
							<Gallery />
						</DataContext.Provider>
					</Fragment>
				} />
				<Route path="/album/:id" element={<AlbumView />} />
				<Route path="/artist/:id" element={<ArtistView />} />
				</Routes>
		</Router>
		</div>
  	);
}

export default App;