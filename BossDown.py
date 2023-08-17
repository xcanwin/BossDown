import sys, re

def path_new_name(path_old):
    index = path_old.rfind('.')
    if index != -1:
        path_new = path_old[:index] + "_ok" + path_old[index:]
    else:
        path_new = path_old
    return path_new

def pdf_blocks(pdf_old):
    content = open(pdf_old, 'rb').read()
    pattern1 = b'(\d+ \d obj\n<<\n.*?\n>>\nstream\n.*?\nendstream\nendobj)'
    blocks = re.findall(pattern1, content, re.DOTALL)
    return content, blocks

def clear_pdf(content, blocks):
    for i in range(len(blocks) - 1, -1, -1):
        if b'/ColorSpace /DeviceGray' in blocks[i] and i > 0:
            block_pre = blocks[i-1]
            pattern2 = b'(stream\n).*?\n(endstream)'
            block_pre_new = re.sub(pattern2, b'\1\2', block_pre, flags=re.DOTALL)
            content = content.replace(block_pre, block_pre_new)
            break
    return content

def main():
    pdf_old = sys.argv[1]
    pdf_new = path_new_name(pdf_old)
    print('[.] read pdf: %s' % (pdf_old))
    content, blocks = pdf_blocks(pdf_old)
    content = clear_pdf(content, blocks)
    open(pdf_new, 'wb').write(content)
    print('[+] save pdf: %s' % (pdf_new))

main()
