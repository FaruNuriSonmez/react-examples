import React, { useEffect, useState } from 'react';
import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { Typography, Box, Stack, Avatar, IconButton, Divider } from '@mui/material';
import { useAppSelector } from '../store';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Root = styled('div')(
    ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(
    ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : "gray"};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 10px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : 'transparent'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}

function Tag(props: TagProps) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <Typography sx={{
                fontSize: "13px",
                fontFamily: "sans-serif",
                color: "gray"
            }}>
                {label}
            </Typography>
            <IconButton sx={{
                backgroundColor: "#94a3b8",
                borderRadius: "5px",
                width: "20px",
                height: "20px",
                marginLeft: 1,
                marginBottom: 1,
                marginTop: 1,
                marginRight: 0.5
            }}>
                <CloseIcon onClick={onDelete} sx={{
                    color: "#fff"
                }} />
            </IconButton>

        </div>
    );
}

const StyledTag = styled(Tag)<TagProps>(
    ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : "#e2e8f0"
        };
  border-radius: 6px;
  box-sizing: content-box;
  padding: 2px 4px 2px 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
    ({ theme }) => `
  width: 300px;
  margin: 10px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : "gray"};
  overflow: auto;
  max-height: 250px;
  border-radius: 10 px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;


    & span {
      flex-grow: 1;
      color:${theme.palette.mode === 'dark' ? '#141414' : theme.palette.grey[600]};
      font-family:sans-serif;
      font-weight:500;
      font-size:15px;
    }

    & span:last-child {
        font-size:13px;
        font-weight:400;
    }

    & svg {
      color: "gray";
    }

    & svg:nth-last-of-type(1){
        display:none;
        color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : 'transparent'};
    font-weight: 600;

    & svg {
        display:none;
    }
    & svg:nth-last-of-type(1){
        display:inline-block;
        color: #0275ff;
        margin:0
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

const MultiSelSearchComponent = () => {
    const charactersReducerState = useAppSelector((state) => state.characters)

    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        multiple: true,
        options: charactersReducerState.data.results,
        //@ts-ignore
        getOptionLabel: (option) => option.name,
    });

    useEffect(() => {
        console.log(charactersReducerState.data.results)
    }, [charactersReducerState.loading])

    const highlightSearchTerm = (text: string, searchTerm: string) => {
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <strong key={index}>{part}</strong>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };


    return (
        <Root>
            <div {...getRootProps()}>
                <Label sx={{
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                    fontWeight: "600",
                    color: "grey"
                }}>Rick and Morty Character Selection</Label>
                <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    {value.map((option: any, index: number) => (
                        <StyledTag label={option.name} {...getTagProps({ index })} />
                    ))}
                    <input {...getInputProps()} />
                </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()} sx={{
                    '& > div': {
                        overflow: 'auto',
                        '&::-webkit-scrollbar': { height: 5, WebkitAppearance: 'none', width: 5 },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: 8,
                            border: '1px solid',
                            borderColor: 'white',
                            backgroundColor: 'rgba(0 0 0 / 0.5)',
                        },
                    },
                }}>
                    {(groupedOptions as typeof charactersReducerState.data.results).map((option, index) => (
                        <>
                            <li
                                {...getOptionProps({ option, index })}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={0}
                                >
                                    <Stack direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                        <CheckBoxIcon fontSize="small" />

                                        <Avatar sx={{ bgcolor: "gray", borderRadius: "6px" }} variant="square">
                                            <LazyLoadImage
                                                width="100%"
                                                height="100%"
                                                //@ts-ignore
                                                src={option.image}
                                            />
                                        </Avatar>
                                        <Stack spacing={1} justifyContent="flex-start" alignItems="flex-start">
                                            <span>
                                                {highlightSearchTerm(
                                                    //@ts-ignore
                                                    option.name,
                                                    //@ts-ignore
                                                    getInputProps().value || ''
                                                )}
                                            </span>
                                            <span>{
                                                //@ts-ignore
                                                option.episode.length
                                            } Episodes</span>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </li>
                            <Divider />
                        </>
                    ))}
                </Listbox>
            ) : null}
        </Root>
    );
}

interface CharacterOptionType {
    name: string;
    episode: [];
}



export default MultiSelSearchComponent