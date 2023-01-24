import React from 'react';
import styled from 'styled-components/native'

const SizedBox = ({ ...props }) => {
    const Box = styled.View`
        ${props?.width && `width: ${props?.width}px`};
        ${props?.height && `height: ${props?.height}px`};
        ${props?.backgroundColor && `background-color: ${props?.backgroundColor}`};
    `;
    return <Box />
}
export default React.memo(SizedBox);