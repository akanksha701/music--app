import React, { useState, useEffect, useMemo } from 'react';
import {
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import PrimaryButton from '../buttons/PrimaryButton';
import { Input } from '@nextui-org/react';
import AlbumDialog from '@/app/AddAlbum/UI/AlbumDialog';
import Image from 'next/image';
interface SearchIconProps {className?: string; }
const SearchIcon: React.FC<SearchIconProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}>
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 
        16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2" />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Image',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => (
      <Image src={params.value} 
        width={50}
        height={50}
        alt={params.row.name} style={{ width: '50px', height: '50px', borderRadius: '4px' }}/>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    flex: 2,
    renderCell: (params) => (
      <div className="flex flex-col items-center gap-2 justify-center  ">
        <div style={{ width: '50px', height: '50px', borderRadius: '4px' }}>
          {params.value}
        </div>
        <div
          className="text-xs text-gray-500 flex flex-col"
          style={{ width: '50px', height: '50px', borderRadius: '4px' }}
        >
          <span>{params.row.artists.join(', ')}</span>
          <span className="w-fit text-[0.6rem] flex gap-1 items-center">
            <p className="text-[0.7rem]">Language:</p>
            <p className="bg-purple-500 rounded-lg px-1 py-0.5 text-white">
              {' '}
              {params.row.language}
            </p>
          </span>
        </div>
      </div>
    ),
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 800,
    flex: 4,
    renderCell: (params) => (
      <div className="flex flex-col items-center gap-4 justify-center  ">
        <div style={{ width: '50px', height: '50px', borderRadius: '4px' }}>
          {params.value}
        </div>
        <div
          className="text-xs text-gray-500 flex flex-col"
          style={{ width: '50px', height: '50px', borderRadius: '4px' }}
        >
          <span className="w-fit text-[0.6rem] flex gap-1 items-center">
            <p className="text-[0.7rem]">Genre:</p>
            <p className="bg-purple-500 rounded-lg px-1 py-0.5 text-white">
              {' '}
              {params.row.genre}
            </p>
          </span>
        </div>
      </div>
    ),
  },
];
interface Artist {
  fullName: string;
  email: string;
}

interface Music {
  _id: string;
  name: string;
  language: string;
  genre: string;
  description: string;
  artists: Artist[];
  liked: boolean;
  price: number;
  currency: string;
  imageUrl: string;
  audioUrl: string;
  createdAt: string;
}
const MusicList = ({
  data,
  MyselectedSongs,
  mode,
  prevData,
}: {
  data: Array<Music>;
  MyselectedSongs: Array<string>;
  mode: string;
  prevData: any;
}) => {
  const [selectedSongs, setSelectedSongs] = useState<any[]>(MyselectedSongs);
  const [filteredData, setFilteredData] = useState(data);
  const [selectionModel, setSelectionModel] =
    useState<GridRowSelectionModel>(MyselectedSongs);

  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);

  const rows = useMemo(
    () =>
      filteredData?.map((item) => ({
        id: item._id,
        image: item.imageUrl,
        name: item.name,
        description: item.description,
        genre: item.genre,
        language: item.language,
        artists: item.artists.map((artist: any) => artist.fullName),
      })),
    [filteredData]
  );

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectionModel(selectionModel);
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    setSelectedSongs(selectedRows);
  };

  const handleCreateAlbum = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filterData = () => {
    let filtered = data;

    if (selectedGenre) {
      filtered = filtered.filter((song) => song.genre === selectedGenre);
    }

    if (selectedLanguage) {
      filtered = filtered.filter((song) => song.language === selectedLanguage);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (song) =>
          song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.language.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [selectedGenre, selectedLanguage, searchQuery]);

  useEffect(() => {
    if (MyselectedSongs.length > 0 && rows) {
      const initialSelectedRows = rows.filter((row) =>
        MyselectedSongs.includes(row.id)
      );
      setSelectionModel(MyselectedSongs);
      setSelectedSongs(initialSelectedRows);
    }
  }, [MyselectedSongs]);

  return (
    <div className="px-8 pb-8 flex flex-col">
      <div className="header-box flex justify-between align-center">
        <h1 className="text-2xl font-bold" style={{ width: '33%' }}>
          My Tracks
        </h1>

        <div
          style={{
            display: 'flex',
            marginBottom: '16px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '33%',
          }}
        >
          {selectedSongs.length >= 2 && (
            <PrimaryButton
              name={mode === 'edit' ? 'Edit Album' : 'Create Album'}
              mode={mode}
              onClick={handleCreateAlbum}
            />
          )}

          <FormControl style={{ margin: '0 16px', minWidth: 120 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              onChange={(event: SelectChangeEvent<string>) =>
                setSelectedGenre(event.target.value)
              }
              label="Genre"
            >
              <MenuItem value="">All Genres</MenuItem>
              {Array.from(new Set(data?.map((item) => item.genre))).map(
                (genre, index) => (
                  <MenuItem key={index} value={genre}>
                    {genre}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={selectedLanguage}
              onChange={(event: SelectChangeEvent<string>) =>
                setSelectedLanguage(event.target.value)
              }
              label="Language"
            >
              <MenuItem value="">All Languages</MenuItem>
              {Array.from(new Set(data?.map((item) => item.language))).map(
                (language, index) => (
                  <MenuItem key={index} value={language}>
                    {language}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="search-field flex justify-center mb-8 w-full">
        <Input
          value={searchQuery}
          className="w-1/2 border-2 border-gray-500 rounded-2xl"
          onChange={(e) => setSearchQuery(e.target.value)}
          isClearable
          label="Search"
          placeholder="Type to search..."
          radius="lg"
          startContent={
            <SearchIcon
              className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400
           pointer-events-none flex-shrink-0"
            />
          }
        />
      </div>

      <p className="text-gray-500 text-md mx-2 my-1">
        {selectedSongs.length} selected
      </p>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={100}
          checkboxSelection
          rowSelectionModel={selectionModel} // Use dynamic selection model
          onRowSelectionModelChange={handleSelectionChange} // Update selection model on change
          sx={{
            border: 0,
            '.MuiDataGrid-footerContainer': { display: 'none' },
            '.MuiDataGrid-cell': {
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
            },
            '.MuiDataGrid-columnHeader': {
              fontWeight: '200',
              fontSize: '0.6rem',
            },
            '.MuiDataGrid-columnHeaderTitle': {
              textTransform: 'uppercase',
            },
          }}
        />
      </Paper>
      <div className="dialog-container">
        <AlbumDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          selectedSongs={selectedSongs}
          formId={'albumForm'}
          defaultData={prevData}
        />
      </div>
    </div>
  );
};
export default MusicList;
